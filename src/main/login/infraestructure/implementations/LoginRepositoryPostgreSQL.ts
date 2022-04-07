import { QueryResult } from "pg";
import { pool } from "../../../database";
import { ErrorMessages, HandledError } from "../../../shared/models/HandledError";
import { LoginRepository } from "../../domain/repository/LoginRepository";
import { UserDTO } from "../models/UserDTO";
import { UserDTOBuilder } from "../models/UserDTOBuilder";

export default class LoginRepositoryPostgreSQL implements LoginRepository {
  public async getLogin(
    email: string,
    password: string
  ): Promise<UserDTO | HandledError> {
    try {
      return this.validate(
        await pool.query(
          "SELECT * FROM users WHERE u_email = $1 AND u_password = $2",
          [email, password]
        )
      );
    } catch (e) {
      return new HandledError(ErrorMessages.DBError, (e as Error).message);
    }
  }

  private validate(rs: QueryResult<any>): UserDTO | HandledError {
    let tempValidationVar: UserDTO | HandledError = {
      message: ErrorMessages.UnexpectedError,
    }; //variable temporal para validar el rs
    switch (rs.rowCount) {
      case 0: {
        tempValidationVar = {
          message: ErrorMessages.DBUserNotFound,
          resolution: "send valid login",
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
          resolution: "incoherence db found, check logs", //TODO registrar rs en logs
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
