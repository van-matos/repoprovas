import bcrypt from "bcrypt";

export function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}