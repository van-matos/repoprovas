import * as userRepository from "../repositories/userRepository";
import { encryptPassword } from "../utils/authUtils";

export async function signUp(email: string, password: string) {
    const checkUser = await userRepository.findUserByEmail(email);

    if (checkUser) 
        throw { status: 401, message: "Email already registered." };

    const encryptedPassword = encryptPassword(password);

    const userData = { email, password: encryptedPassword }

    await userRepository.createUser(userData);
}