import mysql from "mysql2/promise";
import dotenv from "dotenv";

// init .env
dotenv.config();

const db = mysql.createPool(
  {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


// Ngecek Jaringan Koneksi
async function koneksi() {
  try {
    await db.getConnection();
    console.log("Koneksi Berhasil");
  } catch (error) {
    console.log("Koneksi Gagagl", error);
  }
}

// untuk query
async function query(command, values) {
  try {
    const [result] = await db.query(command, values ?? []);
    return result;
  } catch (error) {
    console.log("Query Error", error);
  }
}

export { koneksi, query };
