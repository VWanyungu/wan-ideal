import express from "express";
const router = express.Router();
import {Users} from "../database/utils/database.js";
import hashPassword from "../utils/hashPassword.js";

router.get("/", async (req, res) => {
    const {type} = req.body

    switch (type){
        case "multiple":
            const { page = 1, limit = 10 } = req.query;

            try {
                const response = await Users.getAllUsers({ page: parseInt(page), limit: parseInt(limit) });

                res.status(200).json({
                    status: "success",
                    data: {response},
                    message: "Users retrieved successfully"
                });
            } catch (err) {
                res.status(500).json(
                    { 
                        status: "error", 
                        data: null,
                        message: err.message 
                    }
                );
            }
            break;

        case "single":
            const {inputEmail} = req.body
            try {
                const {email, passwordHash} = await Users.getSingleUserByEmail(inputEmail)

                if (email == undefined || passwordHash == undefined) {
                    return res.status(404).json({
                        status: "error",
                        data: null,
                        message: "User not found"
                    });
                }

                res.status(200).json({
                    status: "success",
                    data: {
                        email: email,
                        passwordHash: passwordHash
                    },
                    message: "User retrieved successfully"
                });
            } catch (err) {
                res.status(500).json(
                    { 
                        status: "error", 
                        data: null,
                        message: err.message 
                    }
                );
            }
            break   

        default:
            res.status(400).json(
                { 
                    status: "error", 
                    data: null,
                    message: "Specify type of fetch in request body"
                }
            );
    }

});

router.post("/", async (req, res) => {
    const hashedPassword = await hashPassword(req.body.password);

    const userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: hashedPassword,
        username: req.body.username,
        role: req.body.role
    }
    try {
        const response = await Users.createUser(userObj);

        res.status(200).json({
            status: "success",
            data: {response},
            message: "User created successfully"
        });
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

router.put("/", (req, res) => {
    res.status(200).send("Users route");
});

router.delete("/", (req, res) => {
    res.status(200).send("Users route");
});

export default router;