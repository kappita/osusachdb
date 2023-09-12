import { createClient } from "@libsql/client/web";
import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { getCareerById } from "../application/getCareerById";
import { getCareersByFaculty } from "../application/getCareersByFaculty";
import { getAllCareers } from "../application/getAllCareers";
const career = new Hono<{ Bindings: Bindings }>();


career.get("/:careerId", async (c) => {
  const careerId = c.req.param("careerId")
  const conn = sqlClient(c.env)
  const careers = await getCareerById(careerId, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

career.get("byFaculty/:facultyId", async (c) => {
  const facultyId = c.req.param("facultyId")
  const conn = sqlClient(c.env)
  const careers = await getCareersByFaculty(facultyId, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

career.get("byCourse/:courseId", async (c) => {
  const courseId = c.req.param("courseId")
  const conn = sqlClient(c.env)
  const careers = await getCareerById(courseId, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

career.get("allCareers/:pag", async (c) => {
  const pag = parseInt(c.req.param("pag"))
  const conn = sqlClient(c.env)
  const careers = await getAllCareers(pag, conn)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})

export default career