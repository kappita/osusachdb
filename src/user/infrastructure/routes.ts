import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { login } from "../application/login";

const user = new Hono<{ Bindings: Bindings }>();


user.post("/login", async (c) => {
  const conn = sqlClient(c.env)
  const body = await c.req.json()
  const careers = await login(body.token, conn, c.env)
  return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
})



export default user