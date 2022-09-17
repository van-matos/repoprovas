import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateSchema = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(422).send(error.details.map((detail: { message: any; }) => detail.message));
        } 

        next();
    }
}