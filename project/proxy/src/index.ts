const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

// Proxy endpoint
app.use('/springboot', proxy('http://oege.ie.hva.nl:8069', {
    proxyReqPathResolver: (req: { originalUrl: string; }) => {
        const newPath = req.originalUrl.replace('/springboot', '/api');
        console.log(`Proxying request to: ${newPath}`);
        return newPath;
    },
    proxyErrorHandler: (err: any, res: {
        status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; };
    }, _next: any) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    }
}));

app.use('/screenshot', proxy('http://oege.ie.hva.nl:8070', {
    proxyReqPathResolver: (req: { originalUrl: string; }) => {
        const newPath = req.originalUrl.replace('/api/screenshot', '/screenshot');
        console.log(`Proxying request to: ${newPath}`);
        return newPath;
    },
    proxyErrorHandler: (err: any, res: {
        status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; };
    }, _next: any) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    }
}));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`CORS Proxy running on http://localhost:${port}`);
});
