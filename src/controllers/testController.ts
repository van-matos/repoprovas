import { Request, Response } from "express";

import * as testService from "../services/testService";

export async function newTest(req: Request, res: Response) {
    const test = req.body;

    await testService.newTest(test)

    return res.status(201).send({ message: "Test saved." });
}

export async function showTestsByDiscipline(req: Request, res: Response) {
    const tests = await testService.getTestsGroupedDiscipline();

    return res.status(201).send(tests);
}