"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const LoginRepositoryPostgreSQL_1 = require("../../infraestructure/implementations/LoginRepositoryPostgreSQL");
const UserDTOBuilder_1 = require("../../infraestructure/models/UserDTOBuilder");
class LoginUseCase {
    constructor() {
        this.loginInterfaceImpl = new LoginRepositoryPostgreSQL_1.LoginInterfaceImpl();
    }
    execute(user) {
        return this.toUser(this.loginInterfaceImpl.getLogin(user));
    }
    toUser(userDTO) {
        return new UserDTOBuilder_1.UserDTOBuilder().toUser(userDTO);
    }
}
exports.LoginUseCase = LoginUseCase;
