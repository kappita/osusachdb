

import { Client } from "@libsql/client/web";


export async function updateUserBySub(name: string, profile_img: string, sub: string, db: Client) {
  const query = `UPDATE user SET name = "${name}", profile_img = "${profile_img}" WHERE user.sub = ${sub}`
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