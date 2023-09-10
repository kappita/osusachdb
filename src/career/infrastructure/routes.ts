import { createClient } from "@libsql/client/web";
import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
const career = new Hono<{ Bindings: Bindings }>();


career.get("/", async (c) => {
  const client = sqlClient(c.env)
  const gwa = await client.execute(`SELECT * FROM career;`)
  return c.json({success: true, payload: gwa.rows}, 200)
})

career.get("byFaculty/:facultyId", async (c) => {
  const faculty = c.req.param("facultyId")
  const client = sqlClient(c.env)
  const gwa = await client.execute(`SELECT * FROM career WHERE faculty_id = ${faculty};`)
  return c.json({success: true, payload: gwa.rows}, 200)
})

career.get("byCourse/:courseId", async (c) => {
  const course = c.req.param("courseId")
  const client = sqlClient(c.env)
  const gwa = await client.execute(`SELECT career.*, course.name course_name FROM ((career INNER JOIN career_course ON career_course.career_id = career.id) INNER JOIN course ON career_course.course_id = course.id) WHERE course.id = ${course};`)
  return c.json({success: true, payload: gwa.rows}, 200)
})

career.get("")

export default career