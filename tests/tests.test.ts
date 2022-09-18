import supertest from "supertest";

import app from "../src/app";
import connection from "../src/dbStrategy/database";
import { createUser } from "./factories/userFactory";
import { createTest } from "./factories/testFactory"

beforeEach(async () => {
    await connection.$executeRaw`TRUNCATE TABLE "tests"`;
    await connection.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Test POST /tests", () => {
    it("Should return 201 if creating exam correctly", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTest();
        const result = await supertest(app).post(`/tests`).send(test).auth(response.body.token, { type: "bearer" });

        expect(result.status).toBe(201);
    });
});