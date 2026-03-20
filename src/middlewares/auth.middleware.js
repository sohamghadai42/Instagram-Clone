const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next){
     const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message: "Unauthorized token"
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch{
        return res.status(401).json({
            message: "Token invalid"
        })
    }

    req.user = decoded;
    next();
}

module.exports = identifyUser;