import { Router } from "express";

import { newTest, showTestsByDiscipline, showTestsByTeacher } from "../controllers/testController";
import { validateToken } from "../middlewares/authMiddleware";
import { validateSchema } from "../middlewares/schemaValidation";
import { newTestSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/tests", validateToken, validateSchema(newTestSchema), newTest);

testRouter.get("/tests/by-discipline", validateToken, showTestsByDiscipline);
testRouter.get("/tests/by-teacher", validateToken, showTestsByTeacher);

export default testRouter;