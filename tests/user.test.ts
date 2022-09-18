import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../src/app";
import connection from "../src/dbStrategy/database";
import { createUser, createUserInvalidEmail, createUserInvalidPassword, createUserMismatchedPasswords } from "./factories/userFactory";

beforeEach(async () => {
    await connection.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("POST /signup", () => {
    it("If given a valid user, should return status code 201", async () => {
        const user = await createUser()

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(201);
    })

    it("If given a valid user that already exists, should return status code 409", async () => {
        const user = await createUser();

        await supertest(app).post(`/signup`).send(user);

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(409); 
    })

    it("If password and confirmPassword mismatch, should return status code 422", async () => {
        const user = await createUserMismatchedPasswords();

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(422);
    })

    it("If given invalid email, should return status code 422", async () => {
        const user = await createUserInvalidEmail();

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(422);
    })

    it("If given invalid password, should return status code 422", async () => {
        const user = await createUserInvalidPassword();

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(422);
    })
})

describe("POST /login", () => {
    it("If given valid credentials, should return status code 200 and authorization token", async () => {
        const registeredUser = await createUser();

        await supertest(app).post(`/signup`).send(registeredUser);

        const user = {
            email: registeredUser.email,
            password: registeredUser.password
        };

        const result = await supertest(app).post(`/login`).send(user);
        const token = result.body;

        expect(result.status).toEqual(200);
        expect(token).not.toBeNull();
    })

    it("If given incorrect email, should return status code 401", async () => {
        const registeredUser = await createUser();

        await supertest(app).post(`/signup`).send(registeredUser);

        const user = {
            email: faker.internet.email(),
            password: registeredUser.password
        };

        const result = await supertest(app).post(`/login`).send(user);

        expect(result.status).toEqual(401);
    })

    it("If given incorrect password, should return status code 401", async () => {
        const registeredUser = await createUser();

        await supertest(app).post(`/signup`).send(registeredUser);

        const user = {
            email: registeredUser.email,
            password: faker.random.alphaNumeric(10)
        };

        const result = await supertest(app).post(`/login`).send(user);

        expect(result.status).toEqual(401);
    })

    it("If given invalid email, should return status code 422", async () => {
        const registeredUser = await createUser();

        await supertest(app).post(`/signup`).send(registeredUser);

        const user = {
            email: faker.random.alphaNumeric(5),
            password: registeredUser.password
        };

        const result = await supertest(app).post(`/login`).send(user);

        expect(result.status).toEqual(422);
    })

    it("If given no password, should return status code 422", async () => {
        const registeredUser = await createUser();

        await supertest(app).post(`/signup`).send(registeredUser);

        const user = {
            email: registeredUser.email,
            password: ""
        };

        const result = await supertest(app).post(`/login`).send(user);

        expect(result.status).toEqual(422);
    })
})

afterAll(async () => {
    await connection.$disconnect();
});