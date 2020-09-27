const puppeteer = require('puppeteer');

const secrets = require('./secrets');

(async () => {
    const browser = await puppeteer.launch({
        // headless: false,
        defaultViewport: null,
        args: ['--start-maximized']        
    });
    const page = await browser.newPage();
    await page.goto('https://instagram.com');

    await page.waitForSelector('input');

    const inputs = await page.$$('input');
    await inputs[0].type(secrets.USERNAME);
    await inputs[1].type(secrets.PASSWORD);

    // XPath approach, works better in this case
    const loginButton = await page.$x('//*[@id="loginForm"]/div/div[3]/button');
    loginButton[0].click();

    await page.waitForNavigation();

    const USERNAMES = ['aaronjack'];

    // Looping through Usernames
    for(let USERNAME of USERNAMES){
        await page.goto(`https://instagram.com/${USERNAMES}`);

        await page.waitForSelector('img');

        // Extracting the src attribute of the profile image
        // it should return the proper source url of the image
        const imgSrc = await page.$eval('img', el => el.getAttribute('src'));
        // console.log({imgSrc});

        // Get header data
        // Will return an array so can be mapped over
        // Should give the text content of followers, following and posts
        const headerData = await page.$$eval('header li', 
            els => els.map(el => el.textContent)
        );

        // Finding name
        const name = await page.$eval('header h1', el => el.textContent);

        // Description, will be the 4th span element
        const description = await page.$$eval('span', el => el[4].textContent);

        // Creating an object with all properties
        const profile = {imgSrc, headerData, name, description};
        console.log(profile);

    }
    
    // Project works in headless mode
    // await browser.close();
    
})();

