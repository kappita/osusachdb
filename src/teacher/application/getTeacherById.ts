import { Client } from "@libsql/client/web";

export async function getTeacherById(teacher: string, db: Client) {
  const query = await db.execute(`SELECT * FROM teacher WHERE id = ${teacher};`)
  const data = query.rows

  if (query.rows.length === 0) {
    return {
      success: false,
      message: "There is not a teacher with that id!",
      status: 204,
      payload: null
    }
  }
  return {
    success: true,
    message: "Teacher retrieved successfully",
    status: 200,
    payload: data
  }
}
