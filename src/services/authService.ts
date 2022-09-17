import * as userRepository from "../repositories/userRepository";
import * as authUtils from "../utils/authUtils";

export async function signUp(email: string, password: string) {
    const checkUser = await userRepository.findUserByEmail(email);

    if (checkUser) 
        throw { status: 401, message: "Email already registered." };

    const encryptedPassword = authUtils.encryptPassword(password);

    const userData = { email, password: encryptedPassword }

    await userRepository.createUser(userData);
}

export async function login(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);

    if (!user || !authUtils.verifyPassword(password, user.password)) 
        throw { status: 401, message: "Email or password is incorrect." };

    const token: string = authUtils.generateToken(user.id);

    return token;
}