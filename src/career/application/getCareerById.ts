import { Client } from "@libsql/client/web";

export async function getCareerById(career: string, db: Client) {
  const query = await db.execute(`SELECT * FROM career WHERE id = ${career}`)
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