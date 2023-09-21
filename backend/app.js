const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')

const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/error')
const { connectDB } = require('./db/db')

const userRouter = require('./routes/user')
const reservationRouter = require('./routes/reservation')

const { job1, job2 } = require('./cron/tasks')

const app = express()

connectDB()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/reservation', reservationRouter)

app.use('/status', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'Working....',
  })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

app.on('listening', () => {
  job1.start()
  job2.start()
})

app.on('close', () => {
  job1.stop()
  job2.stop()
})
