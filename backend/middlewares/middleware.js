
const jwt = require('jsonwebtoken')
const config = require('../config')


export async function  authenticateToken(req,res,next){
    const token = req.headers["authorization"]
    if (!token) {
        return res.status(401).json({
            msg: "Access denied"
        });
    }
    jwt.verify(token, config.jwtSecret , (err,user)=>{
        if(err){
            return res.status(403).json({
                msg : "invalid token"
            })
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken