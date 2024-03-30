import { Client } from "@libsql/client/web";
import { canVoteSchema } from "./schemas";
import { validateJWT } from "../../shared/validateJWT";
import { dbQuery } from "../../shared/dbQuery";



export async function canVote(body: any, db: Client, env: Bindings) {
  const bodyValidation = canVoteSchema.safeParse(body)
  if (!bodyValidation.success) {
    return {
      payload: null,
      success: false,
      error: bodyValidation.error.toString(),
      status: 400
    }
  }

  const data = bodyValidation.data
  const jwtValidation = await validateJWT(data.token, env)

  if (!jwtValidation.success) {
    return {
      payload: null,
      success: false,
      error: jwtValidation.error,
      status: 403
    }
  }

  const query = `SELECT * FROM course_vote c WHERE c.course_id = ${data.course_id} AND c.author_sub = "${jwtValidation.data.sub}";`
  const votesFromUser = await dbQuery(query, db)
  if (!votesFromUser.success) {
    return {
      payload: null,
      success: false,
      error: votesFromUser.error,
      status: 500
    }
  }

  if (votesFromUser.data.length == 0) {
    return {
      payload: {
        can_vote: true,
      },
      success: true,
      error: "El usuario puede votar para este curso",
      status: 200
    }
  } 

  return {
    payload: {
      can_vote: false
    },
    success: true,
    error: "El usuario no puede votar para este curso",
    status: 200
  }
}