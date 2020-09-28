const puppeteer = require('puppeteer');

const Sheet = require('./sheet');
const url = 'https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50';

(async function(){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']        
    });

    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
        path: 'example.png'
    });

    // Create a sheet with a title
    const sheet = new Sheet();
    await sheet.load();
    const title = await page.$eval('.title a', el => el.textContent);
    // Sheet name cannot be more than 100 characters
    const sheetIndex = await sheet.addSheet(title.slice(0, 99), ['points', 'text']);

    // Expand all comment threads on the page
    // $ will do the same as document.querySelector
    // $$ will do the same as document.querySelectorAll
    let expandButtons = await page.$$('.morecomments');
    // console.log(expandButtons.length);

    // Needed to keep opening more comments
    while(expandButtons.length){
        for(let button of expandButtons){
            // Click buttons to expand all nested comments
            // This will be set to loading as Reddit is rate throttled
            // As there are 59 comments this will cause a problem on Reddit server
            await button.click();

            // Adding a small wait between clicks should help with loading problems
            await page.waitFor(500);
        }

        // Need to add wait to avoid document detachment
        await page.waitFor(1000);

        expandButtons = await page.$$('.morecomments');
    }

    // Select all comments and scrape text + points
    const comments = await page.$$('.entry');
    
    // Array to hold comments
    const formattedComments = [];

    for(let comment of comments){
        // Scrape the points for each comment
        // Similar to $ but will take a second argument to run a function on the element
        // Will need to have a catch element to catch any error where thare are no points
        const points = await comment.$eval('.score', 
            el => el.textContent
        ).catch(err => console.error('no score'));

        // Scrape the text for each comment
        // Most of the text without points also have no text
        const rawText = await comment.$eval('.usertext-body', 
            el => el.textContent
        ).catch(err => console.error('no text'));

        // If points and comments exist they will be added to the array
        if(points && rawText){
            // Replace /n characters to clean up text
            const text = rawText.replace(/\n/g, '');

            formattedComments.push({points, text});
        }

    }

    // Sort comments by point
    formattedComments.sort((a, b) => {
        const pointsA = Number(a.points.split(' ')[0]);
        const pointsB = Number(b.points.split(' ')[0]);

        return pointsB - pointsA;
    });

    console.log(formattedComments.slice(0, 10));

    // Add to google spreadsheet
    sheet.addRows(formattedComments, sheetIndex);

    await browser.close();

})();
