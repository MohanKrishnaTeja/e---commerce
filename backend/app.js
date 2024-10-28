const express = require('express')
const app = express()
app.use(express.json())
const authRoute = require("./routes/auth")
const categoryRoute = require("./routes/catogery")
const prisma = require('./db');

app.use("/",authRoute)
app.use("/category",categoryRoute)

const port = 3000
app.listen(port)

