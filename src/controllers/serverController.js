import { pool } from '../config/db.js'

 export const ping = async (req, res) => {
   const [rows] = await pool.query('SELECT * FROM employees')
   res.json(rows)
}