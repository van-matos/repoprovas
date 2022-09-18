import * as testRepository from "../repositories/testRepository";
import * as categoryService from "../services/categoryService";
import * as teacherDisciplineService from "../services/teacherDisciplineService";
import * as disciplineService from "../services/disciplineService";
import * as teacherService from "../services/teacherService";
import { ITestInsert } from "../types/testTypes";

export async function newTest(test: ITestInsert) {
    const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;

    await categoryService.findCategoryById(categoryId);
    await disciplineService.findDisciplineById(disciplineId);
    await teacherService.findTeacherById(teacherId);

    const teacherDiscipline = await teacherDisciplineService.findTeacherDisciplineById(disciplineId, teacherId);

    const testData = { name, pdfUrl, categoryId, teacherDisciplineId: teacherDiscipline.id };

    const savedTest = await testRepository.insertNewTest(testData);

    return savedTest;
}