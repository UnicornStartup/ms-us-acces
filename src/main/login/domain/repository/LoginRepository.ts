import { HandledError } from "../../../shared/models/HandledError";
import { UserDTO } from "../../infraestructure/models/UserDTO";

export interface LoginRepository {
    getLogin(email: string, password: string): Promise<UserDTO | HandledError>;
}