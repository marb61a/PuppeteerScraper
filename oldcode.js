const puppeteer = require('puppeteer');

const secrets = require('./secrets');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']        
    });
    const page = await browser.newPage();
    await page.goto('https://instagram.com');

    await page.waitForSelector('input');

    // More than 1 input
    const inputs = await page.$$('input');
    await inputs[0].type(secrets.USERNAME);
    await inputs[1].type(secrets.PASSWORD);

    // Click login button, second button on the page (at the moment)
    // This maybe a more robust approach (using querySelectorAll on the page)
    // finding the right element rather than using XPath 
    // const loginButton = (await page.$$('button'))[1];
    //loginButton.click();

    // XPath approach, works better in this case
    const loginButton = await page.$x('//*[@id="loginForm"]/div/div[3]/button');
    loginButton[0].click();

    // Wait needed to avoid error
    // await page.waitFor(3000);
    // Waiting for navigation is a better solution
    await page.waitForNavigation();

    const USERNAME = aaronjack;
    await page.goto(`https://instagram.com/${USERNAME}`);

    await page.waitForSelector('article a');

    // Click on the image to be liked
    // Image class name is usually obfuscated
    await(await page.$('artcle a')).click();

    // Click on the like button
    // Needs to be a wait to avoid wrong clicking on a button
    await page.waitFor(1000);
    await(await page.$$('button'))[2].click();
    
    // await browser.close();
    
})();

// XPath can be tested at the console in chromium but not chrome
