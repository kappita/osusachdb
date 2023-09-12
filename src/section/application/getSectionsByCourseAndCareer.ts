import { Client } from "@libsql/client/web";

export async function getSectionsByCourseAndCareer(course: string, career: string, db: Client) {
  const query = await db.execute(`SELECT DISTINCT section.*, course.name course_name FROM ((career_section INNER JOIN section ON career_section.section_id = section.id) INNER JOIN course ON section.course_id = course.id) WHERE career_section.career_id = ${career} AND course.id = ${course};`)
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