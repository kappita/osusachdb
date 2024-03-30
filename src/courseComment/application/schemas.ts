import { z } from "zod"


const commentSchema = z.object({
  course_id: z.number(),
  content: z.string(),
  is_anonymous: z.boolean()
})

export const addCommentSchema = z.object({
  token: z.string(),
  comment: commentSchema
})


export const getCommentsSchema = z.object({
  token: z.string(),
  course_id: z.number()
})