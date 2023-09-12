import { createClient } from "@libsql/client/web";
import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { getAllTeachers } from "../application/getAllTeachers";
import { getTeachersByCourse } from "../application/getTeachersByCourse";
const teacher = new Hono<{ Bindings: Bindings }>();

teacher.get("/allTeachers/:pag", async (c) => {
  const pag = parseInt(c.req.param('pag'))
  const conn = sqlClient(c.env)
  const teachers = await getAllTeachers(pag, conn)

  return c.json({success: teachers.success, message: teachers.message, payload: teachers.payload}, teachers.status)
})

teacher.get("/byCourse/:course_id", async (c) => {
  const courseId = c.req.param("course_id")
  const conn = sqlClient(c.env)
  const teachers = await getTeachersByCourse(courseId, conn)
  return c.json({success: teachers.success, message: teachers.message, payload: teachers.payload}, teachers.status)
})
export default teacher;