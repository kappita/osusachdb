import { Client } from "@libsql/client/web"

export async function getTeachersByCourse(id: string, db: Client) {
  const query = await db.execute(`SELECT DISTINCT teacher.* FROM (((teacher INNER JOIN section_schedule ON teacher.id = section_schedule.teacher_id) INNER JOIN section ON section.id = section_schedule.section_id) INNER JOIN course ON section.course_id = course.id) WHERE course.id = ${id};`)
  const data = query.rows
  return {
    success: true,
    message: "Teachers retrieved successfully",
    status: 200,
    payload: data
  }
}