import { faker } from "@faker-js/faker";

export async function createTest() {
    return {
        name: faker.lorem.word(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 1,
        teacherId: 1
    };
}

export async function createTestWithoutName() {
    return {
        name: "",
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 1,
        teacherId: 1
    };
}

export async function createTestWithoutUrl() {
    return {
        name: faker.lorem.word(),
        pdfUrl: "",
        categoryId: 1,
        disciplineId: 1,
        teacherId: 1
    }
}

export async function createTestUnrelated() {
    return {
        name: faker.lorem.word(),
        pdfUrl: "",
        categoryId: 1,
        disciplineId: 6,
        teacherId: 1
    }
}