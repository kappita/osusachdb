import { createClient } from "@libsql/client/web";
import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { getCourseById } from "../application/getCourseById";
import { getAllCourses } from "../application/getAllCourses";
import { getCoursesByCareer } from "../application/getCoursesByCareer";
import { getCoursesByTeacher } from "../application/getCoursesByTeacher";
const course = new Hono<{ Bindings: Bindings }>();


course.get("/:courseId", async (c) => {
  const courseId = c.req.param("courseId")
  const conn = sqlClient(c.env)
  const courses = await getCourseById(courseId, conn)
  return c.json({success: courses.success, message: courses.message, payload: courses.payload}, courses.status )
})

course.get("/allCourses/:coursePag", async (c) => {
  const pag = parseInt(c.req.param("coursePag"))
  const conn = sqlClient(c.env)
  const courses = await getAllCourses(pag, conn)
  return c.json({success: courses.success, message: courses.message, payload: courses.payload}, courses.status )
})

course.get("/byCareer/:careerId", async (c) => {
  const career = c.req.param("careerId")
  const conn = sqlClient(c.env)
  const courses = await getCoursesByCareer(career, conn)
  return c.json({success: courses.success, message: courses.message, payload: courses.payload}, courses.status )
})

course.get("/byTeacher/:teacherId", async (c) => {
  const teacher = c.req.param("teacherId")
  const conn = sqlClient(c.env)
  const courses = await getCoursesByTeacher(teacher, conn)
  return c.json({success: courses.success, message: courses.message, payload: courses.payload}, courses.status )
})
export default course;


