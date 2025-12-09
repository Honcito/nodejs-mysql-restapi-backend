import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const pool = createPool({
    // host: 'localhost',
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASS,
    // port: process.env.MYSQL_PORT,
    // database: process.env.MYSQL_DATABASE
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
})

// pool.query('SELECT * FROM employees', (err, result) => {

// })