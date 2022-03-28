import { HandledError, isError } from "../../../shared/models/HandledError";
import { User } from "../../domain/models/User";
import { LoginUseCase } from "../../domain/services/LoginUseCase";
import { LoginRequestBodyView } from "../models/LoginRequestBodyView";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";

export class LoginAdapter {

    private useCase: LoginUseCase = new LoginUseCase()

    public async adapt(loginRequestBodyView: LoginRequestBodyView): Promise<LoginResponseBodyView | HandledError> {
        //TODO no deberia unicamente adaptar y ser routes que llame a usecase.execute?
        let loginTempVar = await this.useCase.execute(loginRequestBodyView.toUser(loginRequestBodyView));
        return isError(loginTempVar)? loginTempVar as HandledError : this.userToResponse(loginTempVar as User);
    }

    private userToResponse(user: User): LoginResponseBodyView {
        return new LoginResponseBodyView(user.token);
    }

}
