import { Router } from "express";

import * as authController from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaValidation";
import { signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), authController.signUp);

export default authRouter;