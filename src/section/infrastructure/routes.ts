import { createClient } from "@libsql/client/web";
import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { getSectionsByCourse} from "../application/getSectionsByCourse"
import { getSectionsByTeacher } from "../application/getSectionsByTeacher";
import { getSectionsByCourseAndCareer } from "../application/getSectionsByCourseAndCareer";
import { getAllSections } from "../application/getAllSections";
const section = new Hono<{ Bindings: Bindings }>();


section.get("/byCourse/:courseId", async (c) => {
  const courseId = c.req.param("courseId")
  const conn = sqlClient(c.env)
  const careers = await getSectionsByCourse(courseId, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

section.get("/byTeacher/:teacherId", async (c) => {
  const teacherId = c.req.param("teacherId")
  const conn = sqlClient(c.env)
  const careers = await getSectionsByTeacher(teacherId, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

section.get("/byCourseAndCareer/:courseId/:careerId", async (c) => {
  const courseId = c.req.param("courseId")
  const careerId = c.req.param("careerId")
  const conn = sqlClient(c.env)
  const careers = await getSectionsByCourseAndCareer(courseId, careerId, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

section.get("/allSections/:pag", async (c) => {
  const pag = parseInt(c.req.param("pag"))
  const conn = sqlClient(c.env)
  const sections = await getAllSections(pag, conn)
  return c.json({success: sections.success, message: sections.message, payload: sections.payload}, sections.status)
})


export default section