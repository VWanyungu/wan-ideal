import express from "express";
import {Tokens} from "../database/utils/database.js";
import generateJwtToken from "../utils/generateJwtToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const inputRefreshToken = req.body.refreshToken;
    if (!inputRefreshToken) return res.status(401).json({ status: "error", data: null, message: "Refresh Token not provided" });

    const {refreshToken} = await Tokens.getRefreshToken(inputRefreshToken)

    if (!refreshToken) {
        return res.status(401).json({
            status: "error",
            data: null,
            message: "Revoked Refresh Token"
        });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({
            status: "error",
            data: null,
            message: "Invalid Refresh Token"
        });

        const payload = {
            userId: user.userId,
            email: user.email
        }

        const {token} = generateJwtToken(payload, "token")                

        res.status(200).json({
            status: "success",
            data: {
                token: token,
            },
            message: ""
        });
    })
    
});

export default router;