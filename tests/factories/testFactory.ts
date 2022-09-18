import { faker } from "@faker-js/faker";

export async function createTest() {
    return {
        name: faker.name.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 1,
        teacherId: 1
    };
}