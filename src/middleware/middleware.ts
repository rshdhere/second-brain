import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const header = req.headers["authorization"];
    const DecodedData = jwt.verify(header as string, process.env.JWT_SECRET!)

    if(DecodedData){
        req.userId = (DecodedData as JwtPayload).id;
        return next();
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
}