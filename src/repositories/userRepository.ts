import connection from "../dbStrategy/database";

import { IUserData } from "../types/userTypes";

export async function createUser(user: IUserData) {

    return connection.users.create({ data: user });
}

export async function findUserByEmail(email: string) {

    return connection.users.findFirst({ where: { email }});
}