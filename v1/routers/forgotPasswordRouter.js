import express from "express";
import {Users} from "../database/utils/database.js";
import generateJwtToken from "../utils/generateJwtToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const email = req.body.email;
    if (!email) return res.status(401).json({ status: "error", data: null, message: "Email not provided" });

    const user = await Users.getSingleUserByEmail(email)

    if (user.email == undefined) {
        return res.status(404).json({
            status: "error",
            data: null,
            message: "Email not found"
        });
    }

    const payload = {
        userId: user.userId,
        email: user.email
    }

    const {forgotPasswordToken} = generateJwtToken(payload, "forgotPassword")  

    // TO DO: Send email with signup link to user (with token as parameter)

    res.status(200).json({
        status: "success",
        data: null,
        message: "Email sent"
    });
    
});

export default router;