import { Client } from "@libsql/client/web";

export async function getAllCareers(pag: number, db: Client) {
  const query = await db.execute(`SELECT * FROM career LIMIT 50 OFFSET ${pag * 50}`)
  if (query.rows.length === 0) {
    return {
      success: false,
      message: "No more careers to show!",
      status: 204,
      payload: null
    }
  }
  return {
    success: true,
    message: "Careers retrieved successfully",
    status: 200,
    payload: query.rows
  }
}