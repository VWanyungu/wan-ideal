import 'dotenv/config';
import jwt from 'jsonwebtoken'

export default function authenticateToken(){
    return (req, res, next) => {
        if (req.path === '/login' || req.path === '/health' || req.path === '/signup' || (req.path === '/users' && req.method === 'POST')) {
            return next();
        }
        
        const authHeader = req.headers['authorization'];
        const token  = authHeader && authHeader.split(' ')[1]

        if( token == null) return res.status(401).json({error: "token not provided"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({error: "Forbidden"})
            
            req.user = user
            next()
        }) 
    }
}