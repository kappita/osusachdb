import { Client } from "@libsql/client/web";
import { dbResponse, failedDbResponse } from "./types";


export async function dbQuery<T>(query: string, db: Client): Promise<dbResponse<T[]>> {
  const dbRequest = db.execute(query)
  try {
    const dbResponse = await dbRequest
    return {
      success: true,
      data: dbResponse.rows as T[]
    }
  } catch (e) {
    return {
      success: false,
      error: e
    }
  }
}