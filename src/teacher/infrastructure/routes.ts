import { createClient } from "@libsql/client/web";
import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
const teacher = new Hono<{ Bindings: Bindings }>();

teacher.get("/", async (c) => {
  const client = sqlClient(c.env)
  const gwa = await client.execute(`SELECT * FROM teacher;`)
  return c.json({success: true, payload: gwa.rows}, 200)
})

export default teacher;