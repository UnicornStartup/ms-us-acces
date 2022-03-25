import { UserDTO } from "../../infraestructure/models/UserDTO";
import { User } from "../models/User";

export interface LoginRepository{
    getLogin(user : User) : UserDTO;
}