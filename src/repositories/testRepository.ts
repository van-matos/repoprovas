import connection from "../dbStrategy/database";
import { ITestRequest } from "../types/testTypes";

export async function insertNewTest(test: ITestRequest) {
    return connection.test.create({ data: test });
}

export async function groupTestsByDiscipline() {
    const tests = await connection.term.findMany({
        distinct: ["id"],
        select: {
            number: true,
            Discipline: {
                distinct: ["name"],
                select: {
                    name: true,
                    TeacherDiscipline: {
                        select: {
                            Test: {
                                distinct: ["categoryId"],
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    TeacherDiscipline: {
                                        select: {
                                            Teacher: {
                                                select: {
                                                    name: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return tests;
}