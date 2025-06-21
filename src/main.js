import express from 'express'
import {config} from 'dotenv'
import { connectDB } from './db/index.js'
import transportRouter from './routes/transport.route.js'
import ticketRouter from './routes/ticket.route.js'
import adminRouter from './routes/admin.route.js'
import customerRouter from './routes/customer.route.js'
import { createSuperAdmin } from './db/create_superadmin.js'
import cookieParser from 'cookie-parser'
config()

const app = express()
const PORT = Number(process.env.PORT)

app.use(express.json())
await connectDB()
await createSuperAdmin()

app.use('/transport', transportRouter)
app.use('/ticket', ticketRouter)
app.use('/admin', adminRouter)
app.use('/customer', customerRouter)
app.use(cookieParser())

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})


