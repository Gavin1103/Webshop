import {Connection, createConnection} from "mysql";


const connection: Connection = createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
});

const database: string = process.env.DB_DATABASE || "mydatabase";

const initDb: () => void = (): void => {
    connection.connect((err: { stack: any; }) => {
        if (err) {
            console.error("Error connecting to the database:", err.stack);
            return;
        }
        console.log("Connected to the database.");

        connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``, (err) => {
            if (err) {
                console.error("Error creating database:", err.stack);
                connection.end();
                return;
            }

            console.log(`Database ${database} created or already exists.`);

        });
    });
};

initDb();
