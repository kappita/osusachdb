import { Client } from "@libsql/client/web";
import { dbQuery } from "../../shared/dbQuery";
import { dbResponse } from "../../shared/types";

type difficulty = {
  difficulty_score: number,
  count: number
}

type time = {
  time_score: number,
  count: number
}

type means = {
  vote_count: number,
  difficulty_mean: number,
  time_demand_mean: number
}




export async function getVotesByCourse(courseId: string, db: Client) {
  const difficulty_average = [
    {rating: 1, votes: 0},
    {rating: 2, votes: 0},
    {rating: 3, votes: 0},
    {rating: 4, votes: 0},
    {rating: 5, votes: 0}
  ]
  
  const time_average = [
    {rating: 1, votes: 0},
    {rating: 2, votes: 0},
    {rating: 3, votes: 0},
    {rating: 4, votes: 0},
    {rating: 5, votes: 0}
  ]
  
  const difficulty_query = `SELECT c.difficulty_score, count(*) count FROM course_vote c WHERE c.course_id = ${courseId} GROUP BY c.difficulty_score ORDER BY c.difficulty_score;`
  const time_query = `SELECT c.time_score, count(*) count FROM course_vote c WHERE c.course_id = ${courseId} GROUP BY c.time_score ORDER BY c.time_score;`
  const average_query = `SELECT c.vote_count, c.difficulty_mean, c.time_demand_mean FROM course c WHERE c.id = ${courseId};`

  const difficulty = dbQuery<difficulty>(difficulty_query, db)
  const time = dbQuery<time>(time_query, db)
  const average = dbQuery<means>(average_query, db)

  const difficulty_values = await difficulty
  if (!difficulty_values.success) {
    return {
      success: false,
      message: difficulty_values.error,
      payload: null,
      status: 500
    }
  }

  for (let i = 0; i < difficulty_values.data.length; i++) {
    const val = difficulty_values.data[i]
    difficulty_average[val.difficulty_score - 1].votes = val.count
  }

  const time_values = await time
  if (!time_values.success) {
    return {
      success: false,
      message: time_values.error,
      payload: null,
      status: 500
    }
  }

  for (let i = 0; i < time_values.data.length; i++) {
    const val = time_values.data[i]
    time_average[val.time_score - 1].votes = val.count
  }

  const average_values = await average
  if (!average_values.success) {
    return {
      success: false,
      message: average_values.error,
      payload: null,
      status: 500
    }
  }

  const payload = {
    total_votes: average_values.data[0].vote_count,
    difficulty: {
      average: average_values.data[0].difficulty_mean,
      scores: difficulty_average
    },
    time: {
      average: average_values.data[0].time_demand_mean,
      scores: time_average
    }
  }
  

  return {
    success: true,
    message: "Votes retrieved successfully",
    status: 200,
    payload: payload
  }


}

  


