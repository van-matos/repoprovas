import * as teacherRepository from "../repositories/teacherRepository";

export async function findTeacherById(teacherId: number) {
    const teacher = await teacherRepository.findTeacherById(teacherId);

    if (!teacher)
        throw { status: 404, message: "Teacher not found." };

    return;
}