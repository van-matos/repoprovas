import { Request, Response } from "express";

import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;

    await authService.signUp(email, password);

    res.status(201).send({ message: "Registration complete." });
}

export async function login(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;

    const token = await authService.login(email, password);

    return res.status(200).send({ token });
}