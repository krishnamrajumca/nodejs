const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const groupRouter = require('./routers/group')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(groupRouter)

module.exports = app