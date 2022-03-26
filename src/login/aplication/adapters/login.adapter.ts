import { User } from "../../domain/models/User";
import { LoginUseCase } from "../../domain/services/LoginUseCase";
import { LoginRequestBodyView } from "../models/LoginRequestBodyView";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";

export class LoginAdapter {

    private useCase: LoginUseCase = new LoginUseCase()

    public adapt(loginRequestBodyView: LoginRequestBodyView): LoginResponseBodyView {
        return this.dtoToResponse(this.useCase.execute(loginRequestBodyView.toUser(loginRequestBodyView)));
    }

    private dtoToResponse(userDTO: Promise<User>): LoginResponseBodyView {
        return new LoginResponseBodyView();
    }

}
