import { Client } from "@libsql/client/web"

export async function getCourseById(id: string, db: Client) {
  const query = await db.execute(`SELECT * FROM course WHERE course.id = ${id};`)
  const data = query.rows

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
    payload: data
  }
}
