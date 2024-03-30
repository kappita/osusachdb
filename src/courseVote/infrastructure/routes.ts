


import { sqlClient } from "../../shared/sqlClient";
import { Hono } from "hono";
import { addVote } from "../application/addVote";
import { getVotesByCourse } from "../application/getVotesByCourse";
import { canVote } from "../application/canVote";

const courseVote = new Hono<{ Bindings: Bindings }>();


courseVote.post("/addVote", async (c) => {
  const body = await c.req.json()
  const conn = sqlClient(c.env)
  const vote = await addVote(body, conn, c.env)
  return c.json({success: vote.success, message: vote.error, payload: vote.payload}, vote.status)
})


courseVote.get("byCourse/:course", async (c) => {
  const course_id = c.req.param('course')
  const conn = sqlClient(c.env)
  const vote = await getVotesByCourse(course_id, conn)
  return c.json({success: vote.success, message: vote.message, payload: vote.payload}, vote.status)
})

courseVote.post("/canVote", async (c) => {
  const conn = sqlClient(c.env)
  const body = await c.req.json()
  const response = await canVote(body, conn, c.env)
  return c.json({success: response.success, message: response.error, payload: response.payload}, response.status)
})
export default courseVote