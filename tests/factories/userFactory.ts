import { faker } from "@faker-js/faker";

export async function createUser() {
    const randomPassword = faker.random.alphaNumeric(10);

    const user = {
        email: faker.internet.email(),
        password: randomPassword,
        confirmPassword: randomPassword
    };

    return user;
}

export async function createUserMismatchedPasswords() {
    const randomPassword = faker.random.alphaNumeric(10);
    const randomConfirmPassword = faker.random.alphaNumeric(10);

    const user = {
        email: faker.internet.email(),
        password: randomPassword,
        confirmPassword: randomConfirmPassword
    };

    return user;
}

export async function createUserInvalidEmail() {
    const randomPassword = faker.random.alphaNumeric(10);

    const user = {
        email: faker.random.alphaNumeric(5),
        password: randomPassword,
        confirmPassword: randomPassword
    };

    return user;
}

export async function createUserInvalidPassword() {
    const randomPassword = faker.random.alphaNumeric(5);

    const user = {
        email: faker.internet.email(),
        password: randomPassword,
        confirmPassword: randomPassword
    };

    return user;
}