import jwt from "jsonwebtoken"

const authMiddleware = async(req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message : "Not Authorized, Login Please"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message:"Error"})
    }
}

export default authMiddleware