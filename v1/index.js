import express from "express";
import usersRouter from "././routers/usersRouter.js";
import loginRouter from "././routers/loginRouter.js";
import logoutRouter from "././routers/logoutRouter.js";
import refreshTokenRouter from "././routers/refreshTokenRouter.js";
import authenticateToken from '././middlewares/token.js';
import forgotPasswordRouter from '././routers/forgotPasswordRouter.js'
import resetUserPasswordRouter from '././routers/resetUserPasswordRouter.js'

const router = express.Router();

router.use(authenticateToken());
router.use("/users", usersRouter);
router.use("/signup", usersRouter);
router.use("/login", loginRouter)
router.use("/reset-password", resetUserPasswordRouter)
router.use("/logout", logoutRouter)
router.use("/forgot-password", forgotPasswordRouter)
router.use("/token", refreshTokenRouter)

export default router;