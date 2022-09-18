import connection from "../dbStrategy/database";

export async function findTeacherDisciplineById(disciplineId: number, teacherId: number) {
    return connection.teacherDiscipline.findFirst({ where: { disciplineId, teacherId } });
}