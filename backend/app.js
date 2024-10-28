const express = require('express')
const app = express()
app.use(express.json())
const authRoute = require("./routes/auth")
const categoryRoute = require("./routes/catogery")
const productsRoute = require("./routes/products")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use("/",authRoute)
app.use("/category",categoryRoute)
app.use("/",productsRoute)

const port = 3000
app.listen(port)

