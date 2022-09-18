import { Test } from "@prisma/client";

export type ITestRequest = Omit<Test, "id">;

export type ITestInsert = Omit<Test, "id" | "teacherDisciplineId"> & { disciplineId: number; teacherId: number };