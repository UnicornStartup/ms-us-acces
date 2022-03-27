import { query } from "express";
import { QueryResult } from "pg";
import { pool } from "../../../database";
import { ErrorMessages, HandledError } from "../../../shared/models/HandledError";
import { User } from "../../domain/models/User";
import { LoginRepository } from "../../domain/repository/LoginRepository";
import { UserDTO } from "../models/UserDTO";
import { UserDTOBuilder } from "../models/UserDTOBuilder";

export class LoginInterfaceImpl implements LoginRepository {

    public async getLogin(user: User): Promise<UserDTO | HandledError> {
        try {
            return this.validate(await pool.query('SELECT * FROM users WHERE u_emaila = $1 AND u_password = $2', [user.email, user.password]));
        } catch (e) {
            return {
                message: ErrorMessages.DBError,
                resolution: (e as Error).message
            };
        }
    }

    private validate(rs: QueryResult<any>): UserDTO | HandledError {
        let tempValidationVar: UserDTO | HandledError = {
            message: ErrorMessages.UnexpectedError + " at login rs validation"
        }; //variable temporal para validar el rs
        switch (rs.rowCount) {
            case 0: {
                tempValidationVar = {
                    message: ErrorMessages.DBUserNotFound,
                    resolution: "send valid login"
                };
                break;
            }

            case 1: {
                tempValidationVar = this.toDao(rs);
                break;
            }

            default: {
                tempValidationVar = {
                    message: ErrorMessages.DBIncoherenceError,
                    resolution: "incoherence db found, check logs" //TODO registrar rs en logs
                };
                break;
            }
        }
        return tempValidationVar;
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