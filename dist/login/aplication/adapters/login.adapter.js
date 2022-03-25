"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdapter = void 0;
const LoginUseCase_1 = require("../../domain/services/LoginUseCase");
const LoginResponseBodyView_1 = require("../models/LoginResponseBodyView");
class LoginAdapter {
    constructor() {
        this.useCase = new LoginUseCase_1.LoginUseCase();
    }
    adapt(loginRequestBodyView) {
        return this.dtoToResponse(this.useCase.execute(loginRequestBodyView.toUser(loginRequestBodyView)));
    }
    dtoToResponse(userDTO) {
        return new LoginResponseBodyView_1.LoginResponseBodyView();
    }
}
exports.LoginAdapter = LoginAdapter;
