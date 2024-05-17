import mysql from 'mysql2';
import env from 'dotenv';

env.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
});

const database = process.env.DB_DATABASE || 'mydatabase';

const initDb = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database.');

        connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``, (err) => {
            if (err) {
                console.error('Error creating database:', err.stack);
                connection.end();
                process.exit(1);
                return;
            }

            console.log(`Database ${database} created or already exists.`);
            connection.end();
            process.exit(0);
        });
    });
};

initDb();
