const puppeteer = require('puppeteer');

const USERNAME = 'joebloggs';
const PASSWORD = 'abcd1234';

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
    await inputs[0].type(USERNAME);
    await inputs[1].type(PASSWORD);
    
    // await browser.close();
    
})();
