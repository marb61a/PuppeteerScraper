const puppeteer = require('puppeteer');

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

    // Expand all comment threads on the page
    // $ will do the same as document.querySelector
    // $$ will do the same as document.querySelectorAll
    const expandButtons = await page.$$('.morecomments');
    console.log(expandButtons.length);

    for(let button of expandButtons){
        
    }

    await browser.close();

})();
