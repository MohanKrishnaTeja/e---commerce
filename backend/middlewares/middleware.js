const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const jwtSecret = "hello iam mohan"

router.post('/signup',async(req,res)=>{
    const{ username , email , password , role} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const response  = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role
            }
        })
        res.json({
            msg : "created user successfully",
            response
        })
    }catch(error){
        res.status(500).json({
            msg : "error creating user",
            error
        })
    }
})

router.post("/signin",async(req,res)=>{
    const{ email , password } = req.body;
    try{
        const response = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if(!response){
           return res.json({
                msg : "user doesnot exit"
            })
        }
        const comparePassword = await bcrypt.compare(password,response.password)
        if(!comparePassword){
            return res.json({
                msg : "incorrect password"
            })
        }
        const token = jwt.sign({id:response.id,email},jwtSecret,{expiresIn : "1h"})
        res.status(200).json({
            msg : "signed in successfully",
            token
        })
    }catch(error){
        res.status(500).json({
            msg : "error in signin",
            error
        })
    }
})

module.exports = router