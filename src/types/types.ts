import { z } from "zod";

const emailSchema = z.object({
    email: z.string()
    .min(10, { message: "mail id should have minimum of 10 charachters"} )
    .max(25,  {message: "maild id should be maximum of 25 charachters "} )
    .email({ message: "enter with valid mail id" })
});

const passwordSchema = z.object({
    password: z.string()
    .min(6, { message: "password should have minimum of 6 charachters"} )
    .max(16, { message: "passowrd must not exceed more than 16 charachters"} )
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"})
})

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});