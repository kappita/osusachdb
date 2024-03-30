import { Client } from "@libsql/client/web";
import { addVoteSchema } from "./schemas";
import { validateJWT } from "../../shared/validateJWT";
import { dbQuery } from "../../shared/dbQuery";

type scores = {
  vote_count: number,
  difficulty_mean: number,
  time_demand_mean: number
}



export async function addVote(body: any, db: Client, env: Bindings) {
  const bodyValidation = addVoteSchema.safeParse(body)
  if (!bodyValidation.success) {
    return {
      success: false,
      error: bodyValidation.error.toString(),
      payload: null,
      status: 400
    }
  }


  const data = bodyValidation.data
  const jwtValidation = await validateJWT(bodyValidation.data.token, env)

  if (!jwtValidation.success) {
    return {
      success: false,
      error: jwtValidation.error,
      payload: null,
      status: 401
    }
  }

  const newVoteValidationQuery = `SELECT c.id FROM course_vote c WHERE c.author_sub = "${jwtValidation.data.sub}" AND c.course_id = ${data.vote.course_id};`
  const newVoteValidation = await db.execute(newVoteValidationQuery)
  if (newVoteValidation.rows.length != 0) {
    return {
      success: false,
      error: "El usuario ya ha votado para este curso",
      payload: null,
      status: 401
    }
  }

  const scoresQuery = `SELECT c.vote_count, c.difficulty_mean, c.time_demand_mean FROM course c WHERE c.id = ${data.vote.course_id};`
  const scores = dbQuery<scores>(scoresQuery, db)

  const insertVoteQuery = `INSERT INTO course_vote (author_sub, difficulty_score, time_score, course_id) VALUES ("${jwtValidation.data.sub}", ${data.vote.difficulty_score}, ${data.vote.time_score}, ${data.vote.course_id});`
  const insert = await db.execute(insertVoteQuery)
  if (insert.rowsAffected === 0) {
    return {
      success: false,
      error: "Error guardando voto",
      payload: null,
      status: 500
    }
  }

  const averages = await scores

  if (!averages.success) {
    return {
      success: false,
      error: averages.error,
      payload: null,
      status: 500
    }
  }

  const stats = averages.data[0]

  const newDifficulty = newAverageFormula(stats.difficulty_mean, stats.vote_count, data.vote.difficulty_score)
  const newTime = newAverageFormula(stats.time_demand_mean, stats.vote_count, data.vote.time_score)

  const updateScoreQuery = `UPDATE course SET difficulty_mean = ${newDifficulty}, time_demand_mean = ${newTime}, vote_count = ${stats.vote_count + 1} WHERE id = ${data.vote.course_id};`
  const updateRequest = await db.execute(updateScoreQuery)
  if (updateRequest.rowsAffected === 0) {
    return {
      success: false,
      error: "Error actualizando los promedios",
      payload: null,
      status: 500
    }
  }

  return {
    success: true,
    error: "Votos agregados correctamente",
    payload: null,
    status: 200
  }
  
}


function newAverageFormula(average: number, total: number, newScore: number) {
  const newTotal = total + 1
  const totalScore = average * total
  return (totalScore + newScore) / newTotal
}

