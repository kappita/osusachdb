import { Client } from "@libsql/client/web";

export async function getCoursesByTeacher(teacher: string, db: Client) {
  const query = await db.execute(`SELECT DISTINCT course.* FROM ((course INNER JOIN section ON section.course_id = course.id) INNER JOIN section_schedule ON section_schedule.section_id = section.id) WHERE section_schedule.teacher_id = ${teacher}`)
  if (query.rows.length === 0) {
    return {
      success: false,
      message: "There is no teacher with that id!",
      status: 200,
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