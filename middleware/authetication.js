const jwt = require("jsonwebtoken")
const authorization = (req,res,next)=>{
    const token = req.headers.authorization
    jwt.verify(token, 'masai', function(err, decoded) {
        console.log(decoded) // bar
        if(decoded){
            req.body.user=decoded.user
            next()
        }
      })
}

module.exports={
    authorization
}