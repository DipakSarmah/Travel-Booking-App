import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
import myHotelRoutes from './routes/my-hotels'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log('connect to database')
  })
  .catch((err) => {
    console.log('error in db', err)
  })

const app = express()

app.use(cookieParser())
app.use(express.json()) //convert req.body to json obj automatically
app.use(express.urlencoded({ extended: true })) //parse url to get query parameters
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/my-hotels', myHotelRoutes)

// this line will ensure that if the backend doesnot have the end point route then it will check the frontend route.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(7000, () => {
  console.log('server running on localhost:7000')
})
