import connection from "../dbStrategy/database";

import { IUserData } from "../types/userTypes";

export async function createUser(userData: IUserData) {
    return connection.user.create({ data: userData });
}

export async function findUserByEmail(email: string) {
    return connection.user.findUnique({ where: { email }});
} 