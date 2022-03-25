"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTOBuilder = void 0;
const UserBuilder_1 = require("../../domain/models/UserBuilder");
class UserDTOBuilder {
    constructor() {
        this.userDTO = {
            uid: "",
            email: "",
            username: "",
            password: "",
            registrationTimestamp: "",
            lastAccesTimestamp: "",
            banned: false,
            role: ""
        };
    }
    uid(uid) {
        this.userDTO.uid = uid;
        return this;
    }
    email(email) {
        this.userDTO.email = email;
        return this;
    }
    userDTOname(username) {
        this.userDTO.username = username;
        return this;
    }
    password(password) {
        this.userDTO.password = password;
        return this;
    }
    registrationTimestamp(registrationTimestamp) {
        this.userDTO.registrationTimestamp = registrationTimestamp;
        return this;
    }
    lastAccesTimestamp(lastAccesTimestamp) {
        this.userDTO.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }
    banned(banned) {
        this.userDTO.banned = banned;
        return this;
    }
    role(role) {
        this.userDTO.role = role;
        return this;
    }
    build() {
        return this.userDTO;
    }
    toUser(userDTO) {
        return new UserBuilder_1.UserBuilder()
            .uid(userDTO.uid)
            .email(userDTO.email)
            .username(userDTO.username)
            .password(userDTO.password)
            .registrationTimestamp(userDTO.registrationTimestamp)
            .lastAccesTimestamp(userDTO.lastAccesTimestamp)
            .banned(userDTO.banned)
            .role(userDTO.role)
            .build();
    }
    ;
}
exports.UserDTOBuilder = UserDTOBuilder;
