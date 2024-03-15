import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express()

app.use(express.json()) //convert req.body to json obj automatically
app.use(express.urlencoded({ extended: true })) //parse url to get query parameters
app.use(cors())

app.get('/api/test', async (req: Request, res: Response) => {
  res.json({ message: 'hello from express endpoint!' })
})

app.listen(7000, () => {
  console.log('server running on localhost:7000')
})