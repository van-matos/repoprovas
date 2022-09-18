import connection from "../dbStrategy/database";

export async function findDisciplineById(id: number) {
    return connection.discipline.findUnique({ where: { id } });
}