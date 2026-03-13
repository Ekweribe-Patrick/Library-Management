import jwt from "jsonwebtoken"

const authorize = (allowedRoles) =>(req, res, next) =>{
    try {

        // let token = req.headers.authorization?.split(' ')[1] || null;
        let token = req.cookies.token || null
        
        if (!token) {
            return res.status(401).json({Error:"Access denied, no token provided."});
        }
        
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({Error:"Access denied, insufficient permission."})
        }

        next();
    } catch (err) {
        console.error('token verification error:', {
            message: err.message,
            name: err.name,
        })

        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({error: "Token expired"}); 
        }else if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({error: 'Invalid Token'})
        } 

        return res.status(401).json({error: 'Authentication failed'})
    }
}

export default authorize;