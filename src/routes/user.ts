import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express, { Request, Response, Router } from "express";
import { loginSchema, signupSchema } from "../types/types";
import { UserModel } from "../database/database";
const userRouter = Router();

userRouter.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const parsedData = signupSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message: "Validation Error",
                errors: parsedData.error.format()
            })
            return;
        }
        const { email, password } = parsedData.data;

        const userExists = await UserModel.findOne({
            email: email
        });

        if(userExists){
            res.status(409).json({
                message: "user already exist, try signing-in"
            })
            return;
        }

        const HashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const User = await UserModel.create({
            email: email,
            password: HashedPassword
        });

        const token = jwt.sign({
            id: User._id
        }, process.env.JWT_PASSWORD as string, {
            expiresIn: "15m"
        });

        res.status(201).json({
            message: "your account was created",
            token: token
        })

    } catch (error) {
        console.error("Error while signing-up the user, at", error);
        res.status(500).json({
            message: "Error while signing-up the user"
        })
    }

});

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const parsedData = loginSchema.safeParse(req.body);

        if(!parsedData.success){
            res.status(400).json({
                message: "Validation Error",
                errors: parsedData.error.format()
            })
            return;
        }

        const { email, password } = parsedData.data;

        const ExistingUser = await UserModel.findOne({
            email: email
        });

        if(ExistingUser){
            const passwordMatched = await bcrypt.compare(password, ExistingUser.password);

            if(passwordMatched){
                const token = jwt.sign({
                    id: ExistingUser._id
                }, process.env.JWT_PASSWORD as string, {
                    expiresIn: "15m"
                })
                
                res.status(200).json({
                    message : "user has logged in",
                    token: token
                })
                return;
            } else {
                res.status(401).json({
                    message: "invalid password"
                })
                return;
            }
        }

    } catch(error) {
        console.error('Error occured while signing-in the user, at', error);
        res.status(500).json({
            message: "Error occured while signing-in the user"
        })
    }
});

export default userRouter;