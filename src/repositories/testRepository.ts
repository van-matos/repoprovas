import connection from "../dbStrategy/database";
import { ITestRequest } from "../types/testTypes";

export async function insertNewTest(test: ITestRequest) {
    return connection.test.create({ data: test });
}