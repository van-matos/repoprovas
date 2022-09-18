import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as authTypes from "../types/authTypes";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "").trim();

    if (!token)
        throw { status: 401, message: "Unauthorized."};

    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as authTypes.IJwtPayload;

    res.locals.id = id;

    next();
}