import { Pool } from 'pg';

export const pool = new Pool({
    user: 'co-owner-admin',
    host: 'localhost',
    password: 'f*7@j2XTydDuHz6V',
    database: 'co-owner',
    port: 5432
});