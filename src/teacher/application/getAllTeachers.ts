import { Client } from "@libsql/client/web"

export async function getAllTeachers(pag: number, db: Client) {
  const query = await db.execute(`SELECT * FROM teacher LIMIT 50 OFFSET ${50 * pag};`)
  const data = query.rows
  return {
    success: true,
    message: "Teachers retrieved successfully",
    status: 200,
    payload: data
  }
}