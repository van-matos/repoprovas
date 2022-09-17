import joi from "joi";

import { IUserData } from "../types/userTypes";

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
    confirmPassword: joi.string().required().valid(joi.ref("password"))
});

export const signInSchema = joi.object<IUserData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });