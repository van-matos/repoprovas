import { Router } from "express";

import { newTest } from "../controllers/testController";
import { validateToken } from "../middlewares/authMiddleware";
import { validateSchema } from "../middlewares/schemaValidation";
import { newTestSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/tests", validateToken, validateSchema(newTestSchema), newTest)

export default testRouter;