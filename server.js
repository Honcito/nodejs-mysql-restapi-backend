import express from 'express'
import morgan from 'morgan'
import employeesRoutes from './src/routes/employeeRoutes.js'
import serverRoutes from './src/routes/serverRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', serverRoutes)
app.use('/api/employees', employeesRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'enpoint not found'
    })
})


app.listen(5000)
console.log('Server running on port 5000');
