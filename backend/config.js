const dotenv = require('dotenv')
dotenv.config()

const config = {
    jwtSecret : process.env.JWT_SECRET,
}

module.exports = config;