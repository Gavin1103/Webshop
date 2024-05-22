import puppeteer from 'puppeteer';

void (async () => {
    const url = process.argv[2];
    const clip = JSON.parse(process.argv[3]);

    if (!url || !clip) {
        console.error('Usage: node capture-screenshot.js <url> <clip>');
        process.exit(1);
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const screenshot = await page.screenshot({ clip });

        await browser.close();

        // Output the screenshot as base64 to stdout
        process.stdout.write(screenshot.toString('base64'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
