import connection from "../dbStrategy/database";

export async function findTeacherById(id: number) {
    return connection.teacher.findUnique({ where: { id } });
}