import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { getFaculties } from "../application/getFaculties";

const faculty = new Hono<{ Bindings: Bindings }>();


faculty.get("/allFaculties", async (c) => {
  const conn = sqlClient(c.env)
  const courses = await getFaculties(conn)
  return c.json({success: courses.success, message: courses.message, payload: courses.payload}, courses.status )
})

export default faculty;
