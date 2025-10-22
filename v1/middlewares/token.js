import 'dotenv/config';
import jwt from 'jsonwebtoken'
import { Cache } from '../database/utils/cache';
import { isTokenBlacklisted } from '../utils/checkCache';

export default function authenticateToken(){
    return (req, res, next) => {
        const permittedPaths = ['/login', '/health', '/signup', '/forgot-password'];
        const isPermitted = permittedPaths.includes(req.path) || req.path.startsWith('/reset-password/') || (req.path === '/users' && req.method === 'POST');

        if (isPermitted) return next();
        
        const authHeader = req.headers['authorization'];
        const token  = authHeader && authHeader.split(' ')[1]

        if( token == null) return res.status(401).json({error: "token not provided"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(403).json({error: "Expired token"})
            
            req.user = user

            const blacklisted = await isTokenBlacklisted(token)

            if (blacklisted)
                return res.status(403).json({
                    status: "fail",
                    data: null,
                    message: "Token is blacklisted",
                    error: "Blacklisted token"
                })

            next()
        }) 
    }
}