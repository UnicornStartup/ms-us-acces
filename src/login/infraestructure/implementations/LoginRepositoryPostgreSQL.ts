import { query } from "express";
import { QueryResult } from "pg";
import { pool } from "../../../database";
import { User } from "../../domain/models/User";
import { LoginRepository } from "../../domain/repository/LoginRepository";
import { UserDTO } from "../models/UserDTO";
import { UserDTOBuilder } from "../models/UserDTOBuilder";


export class LoginInterfaceImpl implements LoginRepository {

    async getLogin(user: User): Promise<UserDTO> {
        try {
            //TODO cambiar query
            const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [user.email, user.password]);
            return this.toDao(result)
            
        } catch (e) {
            throw Error((e as Error).message);
        }
    }

    toDao(rs: QueryResult<any>): UserDTO {
        console.log(rs.rows);
        return new UserDTOBuilder()
        .uuid("5d340b06-0281-4de6-a53a-a7736c2612d0")
        .email("email@email.com")
        .username("username")
        .password("5f4dcc3b5aa765d61d8327deb882cf99")
        .registrationTimestamp(Date.now())
        .lastAccesTimestamp(Date.now())
        .banned(false)
        .role("admin")
        .build();
    }
}