import { injectable } from "tsyringe";
import { HandledError, isError } from "../../../shared/models/HandledError";
import { UserDTO } from "../../infraestructure/models/UserDTO";
import { UserDTOBuilder } from "../../infraestructure/models/UserDTOBuilder";
import { User } from "../models/User";
import "reflect-metadata"
import LoginRepositoryPostgreSQL from "../../infraestructure/implementations/LoginRepositoryPostgreSQL";


@injectable()
export default class LoginUseCase {
    loginInterfaceImpl : LoginRepositoryPostgreSQL;

    constructor(loginInterfaceImpl : LoginRepositoryPostgreSQL){
        this.loginInterfaceImpl = loginInterfaceImpl;
    }

    public async execute(email: string, password: string): Promise<UserDTO | HandledError> {
        let loginTemp = await this.loginInterfaceImpl.getLogin(email, password);
        return isError(loginTemp) ? loginTemp as HandledError : this.toUser(loginTemp as UserDTO);
    }

    private toUser(userDTO: UserDTO): User {
        return new UserDTOBuilder().toUser(userDTO);
    }
}