import connection from "../dbStrategy/database";
import { ITestRequest } from "../types/testTypes";

export async function insertNewTest(test: ITestRequest) {
    return connection.test.create({ data: test });
}

export async function groupTestsByDiscipline() {
    const tests = await connection.term.findMany({
        select: {
            number: true,
            Discipline: {
                select: {
                    name: true,
                    TeacherDiscipline: {
                        select: {
                            Test: {
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

export async function groupTestsByTeacher() {
    const tests = await connection.teacher.findMany({
        select: {
            name: true,
            TeacherDiscipline: {
                select: {
                    Test: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            TeacherDiscipline: {
                                select: {
                                    Discipline: {
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
    });

    return tests;
}