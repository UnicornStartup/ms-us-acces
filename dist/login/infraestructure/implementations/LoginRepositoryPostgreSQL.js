"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInterfaceImpl = void 0;
const database_1 = require("../../../database");
const UserDTOBuilder_1 = require("../models/UserDTOBuilder");
class LoginInterfaceImpl {
    getLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM users WHERE u_email = $1 AND u_password = $2', [user.email, user.password]);
                return this.toDao(result);
            }
            catch (e) {
                throw new Error("Database getLogin error");
            }
        });
    }
    toDao(rs) {
        console.log(rs.rows);
        return new UserDTOBuilder_1.UserDTOBuilder().build();
    }
}
exports.LoginInterfaceImpl = LoginInterfaceImpl;
