import { JsonWebTokenError } from "jsonwebtoken"
const jwt = require('jsonwebtoken')


export async function  compareToken(req,res,next){
    const {token} = req.headers.Authorization
    if(!token){
        return res.status(400).json({
            msg : "please signin"
        })
    }
    const response = await jwt.verify(token,jwtsecret)
}