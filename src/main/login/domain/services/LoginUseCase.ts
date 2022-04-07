import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { ErrorMessages, HandledError, isError } from "../../../shared/models/HandledError";
import { UserDTO } from "../../infraestructure/models/UserDTO";
import { UserDTOBuilder } from "../../infraestructure/models/UserDTOBuilder";
import { User } from "../models/User";
import { LoginRepository } from "../repository/LoginRepository";

@injectable()
export default class LoginUseCase {
    repository : LoginRepository;

    constructor(@inject("LoginRepository") repository : LoginRepository){
        this.repository = repository;
    }

    public  async execute(email: string, password: string): Promise<User | HandledError> {
        let loginTemp = await this.repository.getLogin(email, password);
        if(loginTemp == undefined) return new HandledError(ErrorMessages.LoginUserNotFound, "send valid login")
        return isError(loginTemp) ? loginTemp as HandledError : this.toUser(loginTemp as UserDTO);
    }

    private toUser(userDTO: UserDTO): User {
        return new UserDTOBuilder().toUser(userDTO);
    }
}