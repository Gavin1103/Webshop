import net from 'net';

const host = process.env.DB_HOST || 'db';
const port = process.env.DB_PORT || 3306;

const retryInterval = 1000; // Retry every 1 second

function waitForDb() {
    const socket = new net.Socket();

    socket.on('connect', () => {
        console.log(`${host}:${port} is available - executing command`);
        socket.end();
        process.exit(0);
    });

    socket.on('error', () => {
        console.log(`Waiting for ${host}:${port} to be available...`);
        socket.destroy();
        setTimeout(waitForDb, retryInterval);
    });

    socket.connect(port, host);
}

waitForDb();
