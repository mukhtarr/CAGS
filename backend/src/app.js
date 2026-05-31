const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const env = require('./config/env')
const routes = require('./routes')
const notFound = require('./shared/middleware/notFound')
const errorHandler = require('./shared/middleware/errorHandler')

const app = express()

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
app.use(helmet())
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'EduOBE backend foundation is running.',
  })
})

app.use('/api/v1', routes)
app.use(notFound)
app.use(errorHandler)

module.exports = app
