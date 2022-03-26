import { query } from "express";
import { QueryResult } from "pg";
import { pool } from "../../../database";
import { User } from "../../domain/models/User";
import { LoginRepository } from "../../domain/repository/LoginRepository";
import { UserDTO } from "../models/UserDTO";
import { UserDTOBuilder } from "../models/UserDTOBuilder";

export class LoginInterfaceImpl implements LoginRepository {

    public async getLogin(user: User): Promise<UserDTO> {
        try {
            return this.toDao(await pool.query('SELECT * FROM users WHERE u_email = $1 AND u_password = $2', [user.email, user.password]));
        } catch (e) {
            throw Error((e as Error).message);
        }
    }

    private toDao(rs: QueryResult<any>): UserDTO {
        return new UserDTOBuilder()
            .id(rs.rows[0]["u_id"])
            .token("token")
            .uuid(rs.rows[0]["u_code"])
            .email(rs.rows[0]["u_email"])
            .username(rs.rows[0]["u_username"])
            .password(rs.rows[0]["u_password"])
            .registrationTimestamp(rs.rows[0]["u_register_timestamp"])
            .lastAccesTimestamp(rs.rows[0]["u_last_access_timestamp"])
            .banned(rs.rows[0]["u_banned"])
            .role(rs.rows[0]["u_role"])
            .build();
    }
}