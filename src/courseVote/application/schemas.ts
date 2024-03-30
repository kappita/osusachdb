import { z } from 'zod'

const voteSchema = z.object({
  course_id: z.number(),
  difficulty_score: z.number().int().min(1).max(5),
  time_score: z.number().int().min(1).max(5)
})

export const addVoteSchema = z.object({
  token: z.string(),
  vote: voteSchema
})

export const getVotesSchema = z.object({
  token: z.string().nullable()
})

export const canVoteSchema = z.object({
  token: z.string(),
  course_id: z.number().int()
})