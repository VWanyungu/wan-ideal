import express from "express";
import {Users} from "../database/utils/database.js";
import {Cache} from "../database/utils/cache.js";
import generateJwtToken from "../utils/generateJwtToken.js";
import bcrypt from "bcrypt"

const router = express.Router();

router.post("/", async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await Users.getSingleUserByEmail(email)

        if (user.email == undefined) {
            return res.status(404).json({
                status: "error",
                data: null,
                message: "User not found"
            });
        }

        const payload = {
            userId: user.userId,
            email: user.email
        }

        bcrypt.compare(password, user.passwordHash, async function(err, result) {
            if(err) {
                res.status(500).json({
                    status: "error",
                    data: null,
                    message: "Error comparing password"
                });
            }

            if (result){
                const {token, refreshToken} = generateJwtToken(payload, "all")    
                
                res.status(200).json({
                    status: "success",
                    data: {
                        token: token,
                        refreshToken: refreshToken,
                    },
                    message: "User retrieved successfully"
                });
            }else {
                res.status(400).json({
                    status: "fail",
                    data: null,
                    message: "Password do not match"
                });
            }
        })

       
    } catch (err) {
        res.status(500).json(
            { 
                status: "error", 
                data: null,
                message: err.message 
            }
        );
    }
});

export default router;