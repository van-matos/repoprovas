import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";

export async function findTeacherDisciplineById(disciplineId: number, teacherId:number) {
    const teacherDiscipline = await teacherDisciplineRepository.findTeacherDisciplineById(disciplineId, teacherId);

    if (!teacherDiscipline)
        throw { status: 404, message: "Teacher does not teach subject." };

    return teacherDiscipline;
}