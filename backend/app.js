const express = require('express')
const app = express()
app.use(express.json())
const authRoute = require("./routes/auth")
const categoryRoute = require("./routes/catogery")
const { PrismaClient } = require('@prisma/client')

app.use("/",authRoute)
app.use("/category",categoryRoute)

const port = 3000
app.listen(port)
const prisma = new PrismaClient()
exports.prisma = prisma
