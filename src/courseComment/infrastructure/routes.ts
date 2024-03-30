import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { getCommentsByCourse } from "../application/getCommentsByCourse";
import { addComment } from "../application/addComment";

const comment = new Hono<{ Bindings: Bindings }>();


// comment.post("/byCourse", async (c) => {
//   const conn = sqlClient(c.env)
//   const careers = await getCommentsByCourse()
//   return c.json({success: careers.success, message: careers.message, payload: careers.payload}, careers.status)
// })

comment.post("/getComments", async (c) => {
  const conn = sqlClient(c.env)
  const body = await c.req.json()
  const comment = await getCommentsByCourse(body, conn, c.env)
  return c.json({success: comment.success, message: comment.message, payload: comment.payload}, comment.status)
})


comment.post("/addComment", async (c) => {
  const conn = sqlClient(c.env)
  const body = await c.req.json()
  const comment = await addComment(body, conn, c.env)
  return c.json({success: comment.success, message: comment.error, payload: comment.payload}, comment.status)
})



export default comment