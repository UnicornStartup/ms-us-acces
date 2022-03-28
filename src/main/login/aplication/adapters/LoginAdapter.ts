import { HandledError, isError } from "../../../shared/models/HandledError";
import { User } from "../../domain/models/User";
import { LoginUseCase } from "../../domain/services/LoginUseCase";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";

export class LoginAdapter {

    private useCase: LoginUseCase = new LoginUseCase()

    public async adapt(email: string, password: string): Promise<LoginResponseBodyView | HandledError> {
        let loginTempVar = await this.useCase.execute(email, password);
        return isError(loginTempVar) ? loginTempVar as HandledError : this.userToResponse(loginTempVar as User);
    }

    private userToResponse(user: User): LoginResponseBodyView {
        return new LoginResponseBodyView(user.token);
    }

}
