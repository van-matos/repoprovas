import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
}

export function generateToken(userId: number) {
    return jwt.sign({ userId }, String(process.env.JWT_SECRET), { expiresIn: "24h" });
}