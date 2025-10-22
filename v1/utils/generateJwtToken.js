import jwt from "jsonwebtoken";
import 'dotenv/config';

export default function generateJWTToken(user, type) {
    let token, refreshToken, forgotPasswordToken
    switch (type) {
        case "all":
            token = jwt.sign({ userId: user.userId, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            refreshToken = jwt.sign({ userId: user.userId, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
            forgotPasswordToken = jwt.sign({ userId: user.userId, email: user.email }, process.env.FORGOT_PASSWORD_TOKEN_SECRET, {expiresIn: '15m'});
            return {token, refreshToken, forgotPasswordToken}

        case "forgotPassword":
            forgotPasswordToken = jwt.sign({ userId: user.id, email: user.email }, process.env.FORGOT_PASSWORD_TOKEN_SECRET, {expiresIn: '15m'});
            return {forgotPasswordToken}

        case "refreshToken": 
            refreshToken = jwt.sign({ userId: user.userId, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
            return {refreshToken}

        case "token": 
            token = jwt.sign({ userId: user.userId, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            return {token}
            
        default:
            token = jwt.sign({ userId: user.userId, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            refreshToken = jwt.sign({ userId: user.userId, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
            forgotPasswordToken = jwt.sign({ userId: user.userId, email: user.email }, process.env.FORGOT_PASSWORD_TOKEN_SECRET, {expiresIn: '15m'});
            return {token, refreshToken, forgotPasswordToken}
    }
}