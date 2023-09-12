import { Client } from "@libsql/client/web";

export async function getSectionsByTeacher(teacher: string, db: Client) {
  const query = await db.execute(`SELECT DISTINCT section.*, course.name course_name FROM ((section_schedule INNER JOIN section ON section_schedule.section_id = section.id) INNER JOIN course ON section.course_id = course.id) WHERE section_schedule.teacher_id = ${teacher};`)
  if (query.rows.length === 0) {
    return {
      success: false,
      message: "No more sections to show!",
      status: 204,
      payload: null
    }
  }
  return {
    success: true,
    message: "Sections retrieved successfully",
    status: 200,
    payload: query.rows
  }
}