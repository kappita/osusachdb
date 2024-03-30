import { Client } from "@libsql/client/web";


export async function register(name: string, profile_img: string, sub: string, db: Client) {
  const query = `INSERT INTO user (name, profile_img, sub) VALUES ("${name}", "${profile_img}", "${sub}")`
  const dbInsert = await db.execute(query)
  if (dbInsert.rowsAffected == 0) {
    return {
      success: false
    }
  }
  return {
    success: true
  }


}