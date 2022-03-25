"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestBodyView = void 0;
const UserBuilder_1 = require("../../domain/models/UserBuilder");
class LoginRequestBodyView {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    toUser(loginRequestBodyView) {
        return new UserBuilder_1.UserBuilder()
            .email(loginRequestBodyView.email)
            .password(loginRequestBodyView.password)
            .build();
    }
}
exports.LoginRequestBodyView = LoginRequestBodyView;
