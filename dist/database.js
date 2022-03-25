"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    //user: 'co-owner-admin',
    user: "root",
    host: 'localhost',
    password: "root",
    //password: 'f*7@j2XTydDuHz6V',
    //database: 'co-owner',
    database: "postgres",
    port: 5432
});
