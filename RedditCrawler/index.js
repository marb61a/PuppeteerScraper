const puppeteer = require('puppeteer');

(async function(){
    const browser = await puppeteer.launch({
        // headless: false,
        defaultViewport: null,
        args: ['--start-maximized']        
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');

    await browser.close();

})();
