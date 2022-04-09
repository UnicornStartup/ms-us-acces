import LoginUseCase from "../../domain/services/LoginUseCase";
import { injectable } from "tsyringe";
import { HandledError, isError } from "../../../shared/domain/models/HandledError";
import { User } from "../../domain/models/User";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";

@injectable()
export default class LoginAdapter {
    useCase: LoginUseCase;

    constructor(useCase : LoginUseCase){
        this.useCase = useCase;
    }

    public async adapt(email: string, password: string): Promise<LoginResponseBodyView | HandledError> {
        let loginTempVar = await this.useCase.execute(email, password);
        return isError(loginTempVar) ? loginTempVar as HandledError : this.userToResponse(loginTempVar as User);
    }

    private userToResponse(user: User): LoginResponseBodyView {
        return new LoginResponseBodyView(user.token!!);
    }

}
