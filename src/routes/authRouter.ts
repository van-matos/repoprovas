import { Router } from "express";

import * as authController from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaValidation";
import * as authSchema from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema.signUpSchema), authController.signUp);
authRouter.post("/login", validateSchema(authSchema.signInSchema), authController.login);

export default authRouter;