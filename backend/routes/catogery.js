const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authorizeRoles = require('../middlewares/authorizeRoles')
const authenticateToken = require('../middlewares/authenticateToken')
const router = express.Router()

router.post("/",authenticateToken,authorizeRoles("ADMIN"),async(req,res)=>{
    const { name, description } = req.body
    try{
        const response = await prisma.category.create({
            data : {
                name,
                description
            }
        })
        res.status(200).json({
            msg : "catogery added successfully",
            response
        })
    }catch (error) {
        console.error("Error:", error);
        res.status(400).json({
            msg: "unable to add category",
            error: error.message,  // Log the specific error message
        });
    }
})

router.get("/",authenticateToken,authorizeRoles("ADMIN"),async(req,res)=>{
    try{
        const response = await prisma.category.findMany()
        
        res.json(response)
    }catch(error){
        res.status(400).json({
            msg : "error in retriving categories",
            error
        })
    }
})

router.put("/:id",authenticateToken,authorizeRoles("ADMIN"),async(req,res)=>{
    const{name, description} = req.body
    const{id} = req.params
    try{
        const response = await prisma.category.update({
            where :{
                id : Number(id)
            },
            data : {
                name,
                description
            }
        })
        res.json({
            msg : "updated successfully"
        })
    }catch(error){
        res.status(400).json({
            msg : "error in updating category",
            error
        })
    }

})

module.exports = router