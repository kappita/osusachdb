import { Client } from "@libsql/client/web";
import { dbQuery } from "../../shared/dbQuery";

type user = {
  id: number,
  sub: user,
  name: string,
  profile_img: string
}


export async function getUserBySub(sub: string, db: Client) {
  const query = `SELECT * FROM user WHERE user.sub = "${sub}";`
  const userRequest = await dbQuery<user>(query, db)
  
  return userRequest

}