const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

app.post('/screenshot', async (req, res) => {
    const {url, clip, clientViewPort} = req.body;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
            width: clientViewPort.width,
            height: clientViewPort.height,
            deviceScaleFactor: 2
        });
        await page.goto(url, {waitUntil: 'networkidle2'});

        const screenshot = await page.screenshot({
            clip: clip
        });

        await browser.close();
        res.status(200).send(screenshot.toString('base64'));
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Screenshot server listening at http://localhost:${port}`);
});
