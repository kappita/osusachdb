import { Client } from "@libsql/client/web";

export async function getCoursesByCareer(career: string, db: Client) {
  const query = await db.execute(`SELECT DISTINCT course.*, career_course.level FROM ((course INNER JOIN career_course ON career_course.course_id = course.id) INNER JOIN career on career_course.career_id = career.id) WHERE career.id = ${career}`)
  if (query.rows.length === 0) {
    return {
      success: false,
      message: "No more courses to show!",
      status: 204,
      payload: null
    }
  }
  return {
    success: true,
    message: "Courses retrieved successfully",
    status: 200,
    payload: query.rows
  }
}