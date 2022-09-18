import supertest from "supertest";

import app from "../src/app";
import { createUser, createUserInvalidEmail, createUserInvalidPassword, createUserMismatchedPasswords } from "./factories/userFactory";

describe("POST /signup", () => {
    it("If given a valid user, should return 201", async () => {
        const user = await createUser()

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(201);
    })

    it("If given a valid user that already exists, should return 409", async () => {
        const user = await createUser();

        await supertest(app).post(`/signup`).send(user);

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(409); 
    })

    it("If password and confirmPassword mismatch, should return 422", async () => {
        const user = await createUserMismatchedPasswords();

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(422);
    })

    it("If given invalid email, should return 422", async () => {
        const user = await createUserInvalidEmail();

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(422);
    })

    it("If given invalid password, should return 422", async () => {
        const user = await createUserInvalidPassword();

        const result = await supertest(app).post(`/signup`).send(user);

        const status = result.status;

        expect(status).toEqual(422);
    })
})