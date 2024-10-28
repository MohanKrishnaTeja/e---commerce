const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authenticateToken')
const authorizeRoles = require('../middlewares/authorizeRoles')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//to get all the routes
router.get('/',authenticateToken,async(req,res)=>{
    try{
        const products = await  prisma.product.findMany()
        res.json(products)
    }catch(error){
        res.status(500).json({
            msg : "error retreving products"
        })
    }
})


//to get a single product by id

router.get('/:id',authenticateToken,async (req,res)=>{
    const {id} = req.params
    try{
        const product = await prisma.product.findUnique({
            where :{
                id : Number(id)
            }
        })
        if(!product){
            res.status(404).json({
                msg : "product not found"
            })
        }
        res.json(product)
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg : "error retriving product"
        })
    }
})


//adding a product in the database only admin can do this

router.post("/products",authenticateToken,authorizeRoles("ADMIN"),async(req,res)=>{
    const {name, description, price, stock, category} = req.body
    
    try{
        const catid = await prisma.category.findFirst({
            where : {
                name : category
            }
        })
        const response = await prisma.product.create({
            data : {
                name,
                description,
                price,
                stock,
                categoryId : catid.id
            }
        })
        res.json({
            msg : "product created successfully",
            response
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            msg : "error in creating producting",
            error
        })
    }
})

module.exports = router