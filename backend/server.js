import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import { generalLimiter, resendLimiter } from './middleware/limiter.js'
import { createGuardianMiddleware } from 'bot-guardian-js/express';
import botGuard from './middleware/botGuard.js'
import bookRoutes from './routes/bookRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from "cookie-parser"
import { protect } from './middleware/protect.js'
import { startDbCleanup } from './cron.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    })
)
app.use(helmet())
app.use(generalLimiter)
app.use(createGuardianMiddleware())

app.use("/api/auth", authRoutes)
app.use("/api/auth/resend-verification", resendLimiter)
app.use("/api/mybooks", botGuard, protect, bookRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  startDbCleanup()
})