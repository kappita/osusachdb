import { Client } from "@libsql/client/web";
import { addCommentSchema } from "./schemas";
import { validateJWT } from "../../shared/validateJWT";



export async function addComment(body: any, db: Client, env: Bindings) {
  const bodyValidation = addCommentSchema.safeParse(body)
  if (!bodyValidation.success) {
    return {
      success: false,
      payload: null,
      error: bodyValidation.error,
      status: 400
    }
  }
  const data =bodyValidation.data
  const jwtValidation = await validateJWT(data.token, env)

  if (!jwtValidation.success) {
    return {
      success: false,
      payload: null,
      error: jwtValidation.error,
      status: 403
    }
  }

  const query = `INSERT INTO course_comment (author_sub, is_anonymous, content, course_id) VALUES ("${jwtValidation.data.sub}", ${data.comment.is_anonymous}, "${data.comment.content}", "${data.comment.course_id}");`

  const insert = await db.execute(query)
  if (insert.rowsAffected != 1) {
    return {
      success: false,
      payload: null,
      error: "Error guardando comentario en la base de datos",
      status: 500
    }
  }

  return {
    success: true,
    payload: null,
    error: "Comentario guardado correctamente",
    status: 200
  }

}