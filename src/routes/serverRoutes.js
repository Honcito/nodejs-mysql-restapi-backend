import express from 'express'
import { ping } from '../controllers/serverController.js'

const router = express.Router()


router.get('/ping', ping)


export default router;