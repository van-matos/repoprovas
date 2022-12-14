import supertest from "supertest";

import app from "../src/app";
import connection from "../src/dbStrategy/database";
import { createUser } from "./factories/userFactory";
import { createTest, createTestWithoutName, createTestWithoutUrl, createTestUnrelated } from "./factories/testFactory"

beforeEach(async () => {
    await connection.$executeRaw`TRUNCATE TABLE "tests"`;
    await connection.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("POST /tests", () => {
    it("If given valid test, should return status code 201", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTest();
        const result = await supertest(app).post(`/tests`).set({ Authorization: `Bearer ${response.body.token}`}).send(test);

        expect(result.status).toBe(201);
    });

    it("If invalid token given, should return status code 500", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTest();
        const result = await supertest(app).post(`/tests`).set({ Authorization: `Bearer ${response.body.token}a`}).send(test);

        expect(result.status).toBe(500);
    });

    it("If no request header, should return status code 401", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTest();
        const result = await supertest(app).post(`/tests`).send(test);

        expect(result.status).toBe(401);
    })

    it("If no test name given, should return status code 422", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTestWithoutName();
        const result = await supertest(app).post(`/tests`).set({ Authorization: `Bearer ${response.body.token}`}).send(test);

        expect(result.status).toBe(422);
    })

    it("If no test url given, should return status code 422", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTestWithoutUrl();
        const result = await supertest(app).post(`/tests`).set({ Authorization: `Bearer ${response.body.token}`}).send(test);

        expect(result.status).toBe(422);
    })

    it("If invalid categoryId given, should return status code 422", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTestWithoutUrl();
        const result = await supertest(app).post(`/tests`).set({ Authorization: `Bearer ${response.body.token}`}).send(test);

        expect(result.status).toBe(422);
    })

    it("if unrelated teacher and discipline given, should return status code 422", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTestUnrelated();
        const result = await supertest(app).post(`/tests`).set({ Authorization: `Bearer ${response.body.token}`}).send(test);

        expect(result.status).toBe(422);
    })
});

describe("GET /tests/by-discipline", () => {
    it("If test retrieval successful, should return status code 200", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const result = await supertest(app).get(`/tests/by-discipline`).set({ Authorization: `Bearer ${response.body.token}`});

        expect(result.status).toBe(200); 
    })

    it("If invalid token given, should return status code 500", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const result = await supertest(app).get(`/tests/by-discipline`).set({ Authorization: `Bearer ${response.body.token}a`});

        expect(result.status).toBe(500);
    });

    it("If no request header, should return status code 401", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTest();
        const result = await supertest(app).get(`/tests/by-discipline`);

        expect(result.status).toBe(401);
    })
})

describe("GET /tests/by-teacher", () => {
    it("If test retrieval successful, should return status code 200", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const result = await supertest(app).get(`/tests/by-teacher`).set({ Authorization: `Bearer ${response.body.token}`});

        expect(result.status).toBe(200); 
    })

    it("If invalid token given, should return status code 500", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const result = await supertest(app).get(`/tests/by-teacher`).set({ Authorization: `Bearer ${response.body.token}a`});

        expect(result.status).toBe(500);
    });

    it("If no request header, should return status code 401", async () => {
        const user = await createUser();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/login`).send(userLogin);

        const test = await createTest();
        const result = await supertest(app).get(`/tests/by-teacher`);

        expect(result.status).toBe(401);
    })
})

afterAll(async () => {
    await connection.$disconnect();
});