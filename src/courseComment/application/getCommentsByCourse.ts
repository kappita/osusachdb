import { Client } from "@libsql/client/web";
import { dbQuery } from "../../shared/dbQuery";
import { validateJWT } from "../../shared/validateJWT";
import { getCommentsSchema } from "./schemas";

type fullComment = {
  user_profile_img: string,
  user_name: string,
  comment_id: number,
  is_anonymous: boolean,
  content: string

}


export async function getCommentsByCourse(body: any, db: Client, env: Bindings) {
  const bodyValidation = getCommentsSchema.safeParse(body)
  if (!bodyValidation.success) {
    return {
      payload: null,
      success: false,
      status: 201,
      message: "This user has no access to comments"
    }
  }

  const data = bodyValidation.data
  const authentication = await validateJWT(data.token, env)
  if (!authentication.success) {
    return {
      payload: null,
      success: false,
      status: 403,
      message: "This user has no access to comments"
    }
  }


  const query = `SELECT c.id comment_id,
                        c.is_anonymous,
                        c.content,
                        u.name user_name,
                        u.profile_img user_profile_img
                        FROM course_comment c INNER JOIN user u ON c.author_sub = u.sub WHERE c.course_id = ${data.course_id};`
  const response = await dbQuery<fullComment>(query, db)

  if(!response.success) {
    return {
      payload: null,
      success: false,
      status: 201,
      message: response.error
    }
  }
  const filtered = response.data.map(e => {
    if (e.is_anonymous) {
      e.user_name = "Anónimo",
      e.user_profile_img = "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
    }
    return e
  })

  return {
    payload: filtered,
    success: true,
    status: 200,
    message: "Comments successfully retrieved"
  }




} 