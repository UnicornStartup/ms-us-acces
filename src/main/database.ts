import { Pool } from 'pg';

export const pool = new Pool({
    //user: 'co-owner-admin',
    user: "root",
    host: 'localhost',
    password: "root",
    //password: 'f*7@j2XTydDuHz6V',
    //database: 'co-owner',
    database: "postgres",
    port: 5432
});