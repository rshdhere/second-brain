import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email({message: "email-id should be valid"}).min(5, {message: "email should have atleast 5 charachters"}).max(30, {message: "email cant exceed more than 30 charachters"}),
    password: z.string().min(8, {message: "password should be minimum of 8 charachters"}).max(20, {message: "password should be maximum of 20 charachters"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"})
}).strict();

export const signinSchema = z.object({
    email: z.string().email({message: "email-id should be valid"}).min(5, {message: "email should have atleast 5 charachters"}).max(30, {message: "email cant exceed more than 30 charachters"}),
    password: z.string().min(8, {message: "password should be minimum of 8 charachters"}).max(20, {message: "password should be maximum of 20 charachters"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"})
}).strict();

export const contentSchema = z.object({
    title: z.string().min(1, {message: "minimum 1 charachter should be written"}),
    link: z.string().url({message: "Invalid url"}),
    type: z.enum(['image', 'video', 'blog', 'audio'], {message: "It should be the type of either image, video, blog, audio"}),
    tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/), {message: "Invalid ObjectId format"}).optional(),
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid ObjectId format"})
});