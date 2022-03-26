import { LoginInterfaceImpl } from "../../infraestructure/implementations/LoginRepositoryPostgreSQL";
import { UserDTO } from "../../infraestructure/models/UserDTO";
import { UserDTOBuilder } from "../../infraestructure/models/UserDTOBuilder";
import { User } from "../models/User";

export class LoginUseCase {
    
    private loginInterfaceImpl = new LoginInterfaceImpl();

    public async execute (user: User) : Promise<User> {
        return this.toUser(await this.loginInterfaceImpl.getLogin(user));
    }

    private toUser(userDTO: UserDTO): User{
        return new UserDTOBuilder().toUser(userDTO);
    }
    
}