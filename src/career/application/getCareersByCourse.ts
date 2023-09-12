import { Client } from "@libsql/client/web";

export async function getCareersByCourse(course: string, db: Client) {
  const query = await db.execute(`SELECT career.*, course.name course_name FROM ((career INNER JOIN career_course ON career_course.career_id = career.id) INNER JOIN course ON career_course.course_id = course.id) WHERE course.id = ${course};`)
  if (query.rows.length === 0) {
    return {
      success: false,
      message: "No more careers to show!",
      status: 204,
      payload: null
    }
  }
  return {
    success: true,
    message: "Careers retrieved successfully",
    status: 200,
    payload: query.rows
  }
}