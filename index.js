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
    
    // await browser.close();
    
})();

// XPath can be tested at the console in chromium but not chrome
