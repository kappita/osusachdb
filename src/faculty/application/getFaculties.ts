import { Client } from "@libsql/client/web";


export async function getFaculties(db: Client) {
  const query = await db.execute(`SELECT * FROM faculty;`)
  if (query.rows.length === 0) {
    return {
      success: false,
      message: "There is not a course with that id!",
      status: 204,
      payload: null
    }
  }
  return {
    success: true,
    message: "Course retrieved successfully",
    status: 200,
    payload: query.rows
  }
}