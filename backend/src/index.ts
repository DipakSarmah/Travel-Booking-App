import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(
  ()=>{
    console.log('connect to database')
  }
).catch((err)=>{
  console.log("error in db",err)
})

const app = express()

app.use(express.json()) //convert req.body to json obj automatically
app.use(express.urlencoded({ extended: true })) //parse url to get query parameters
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(7000, () => {
  console.log('server running on localhost:7000')
})
