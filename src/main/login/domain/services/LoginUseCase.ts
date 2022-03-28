import { HandledError, isError } from "../../../shared/models/HandledError";
import { LoginInterfaceImpl } from "../../infraestructure/implementations/LoginRepositoryPostgreSQL";
import { UserDTO } from "../../infraestructure/models/UserDTO";
import { UserDTOBuilder } from "../../infraestructure/models/UserDTOBuilder";
import { User } from "../models/User";

export class LoginUseCase {

    private loginInterfaceImpl = new LoginInterfaceImpl();

    public async execute(email: string, password: string): Promise<UserDTO | HandledError> {
        let loginTemp = await this.loginInterfaceImpl.getLogin(email, password);
        return isError(loginTemp) ? loginTemp as HandledError : this.toUser(loginTemp as UserDTO);
    }

    private toUser(userDTO: UserDTO): User {
        return new UserDTOBuilder().toUser(userDTO);
    }
}