import net from 'net';
import env from 'dotenv';

env.config();

const host = process.env.DB_HOST || 'db';
const port = process.env.DB_PORT || 3306;

const retryInterval = 1000; // Retry every 1 second

function waitForDb() {
    const socket = new net.Socket();

    console.log(`Attempting to connect to ${host}:${port}...`);

    socket.on('connect', () => {
        console.log(`${host}:${port} is available - executing command`);
        socket.end();
        process.exit(0);
    });

    socket.on('error', (err) => {
        console.log(`Error: ${err.message}`);
        console.log(`Waiting for ${host}:${port} to be available...`);
        socket.destroy();
        setTimeout(waitForDb, retryInterval);
    });

    socket.connect(port, host);
}

waitForDb();
