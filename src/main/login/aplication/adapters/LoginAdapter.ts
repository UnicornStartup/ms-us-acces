import { User } from "../../domain/models/User";
import { LoginUseCase } from "../../domain/services/LoginUseCase";
import { LoginRequestBodyView } from "../models/LoginRequestBodyView";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";

export class LoginAdapter {

    private useCase: LoginUseCase = new LoginUseCase()

    public async adapt(loginRequestBodyView: LoginRequestBodyView): Promise<LoginResponseBodyView> {
        //TODO no deberia unicamente adaptar y ser routes que llame a usecase.execute?
        return this.userToResponse(await this.useCase.execute(loginRequestBodyView.toUser(loginRequestBodyView)));
    }

    private userToResponse(user: User): LoginResponseBodyView {
        return new LoginResponseBodyView(user.token);
    }

}