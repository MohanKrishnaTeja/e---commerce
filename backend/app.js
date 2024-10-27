const express = require('express')
const app = express()
app.use(express.json())
const auth = require("./routes/auth")
const { PrismaClient } = require('@prisma/client')

app.use("/",auth)

const port = 3000
app.listen(port)
const prisma = new PrismaClient()
exports.prisma = prisma
