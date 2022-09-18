import connection from "../dbStrategy/database";

export async function findCategoryById(id: number) {
    return connection.category.findUnique({ where: { id } });
}