import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`SELECT NOW() AS time`;

    res.status(200).json({
      success: true,
      message: "Database Connected Successfully!",
      time: result[0].time
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: String(error)
    });
  }
}
