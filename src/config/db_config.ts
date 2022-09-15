import { Pool } from "pg";
import { envConfig } from "./env_config";

//create pool
const pool = new Pool({
    connectionString: envConfig.PG_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

//sql query
async function query(text: any) {
    const res = await pool.query(text);
    const rows = res.rows;
    return rows;
}
  
export const db = {
    query
}