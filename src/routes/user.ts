import { Router, Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userRouter = Router();

import { ContentModel, UserModel } from '../database/database';
import { contentSchema, signinSchema, signupSchema } from '../types/types';
import { AuthMiddleware } from '../middleware/middleware';

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

        const existingUser = await UserModel.findOne({
            email: email
        });

        if(existingUser){
            res.status(409).json({
                message: "User already exists, try signing-in"
            })
            return;
        }

        const Hashedpassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));

        const user = await UserModel.create({
            email: email,
            password: Hashedpassword
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET!);

        res.status(201).json({
            message: "user has signed-up",
            token: token
        });

    } catch (error) {
        console.error('error occured while signing-up the user, at', error);

        res.status(500).json({
            message: "error occured while signing-up the user"
        });
    };

});

userRouter.post('/sign-in', async (req: Request, res: Response) => {
    try {
        const parsedData = signinSchema.safeParse(req.body);

        if(!parsedData.success){
            res.status(400).json({
                message: "Validation Error",
                errors: parsedData.error.format()
            })
            return;
        };

        const {email, password} = parsedData.data;

        const user = await UserModel.findOne({
            email: email
        });

        if(user){
            const PasswordMatched = await bcrypt.compare(password, user.password!);

            if(PasswordMatched){
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET!);

                res.status(200).json({
                    message: "user has signed-in",
                    token: token
                });
            } else {
                res.status(403).json({
                    message: "Invalid password for the given user"
                });
            };
        };
    } catch (error){
        console.error('error occured while signing-in the user, at', error);
        res.status(500).json({
            message: "error occured while signing-in the user"
        })
    }

});

userRouter.post('/content', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const parsedData = contentSchema.safeParse({ ...req.body, userId });

        if(!parsedData.success){
            res.status(400).json({
                message: "Validation Error",
                errors: parsedData.error.format()
            })
            return;
        }
        const { title, link, type, tags } = parsedData.data;

        await ContentModel.create({
            userId: userId,
            title: title,
            link: link,
            type: type,
            tags: tags
        });
        res.status(201).json({
            message: "Content was stored in database"
        })
    } catch (error) {
        console.error('Error occured while saving content to the database, at', error);
        res.status(500).json({
            message: "Error while stroing content to database"
        });
    };
});

userRouter.get('/content', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const content = await ContentModel.find({
            userId: userId
        }).populate('userId', 'email');

        res.status(200).json({
            content: content
        })
    } catch(error) {
        console.error('Error while fetching contents from the database, at', error)
        res.status(500).json({
            message: "Error while fetching contents from database"
        })
    }
});

// this endpoint will delete entire content of the user was stored in our database
userRouter.delete('/content', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        
        await ContentModel.deleteMany({
            userId: userId,
        });

        res.json({
            message: "deleted content"
        });
    } catch(error) {
        console.error('Error occured while deleteing content from the database, at', error);
        res.status(500).json({
            message: "Error while deleting content for the user"
        });
    };
});

userRouter.post('/brain/share', AuthMiddleware, async (req: Request, res: Response) => {

});

userRouter.get('/brain/:shareLink', AuthMiddleware, async (req: Request, res: Response) => {

});

export default userRouter;