"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = void 0;
class UserBuilder {
    constructor() {
        this.user = {
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
        this.user.uid = uid;
        return this;
    }
    email(email) {
        this.user.email = email;
        return this;
    }
    username(username) {
        this.user.username = username;
        return this;
    }
    password(password) {
        this.user.password = password;
        return this;
    }
    registrationTimestamp(registrationTimestamp) {
        this.user.registrationTimestamp = registrationTimestamp;
        return this;
    }
    lastAccesTimestamp(lastAccesTimestamp) {
        this.user.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }
    banned(banned) {
        this.user.banned = banned;
        return this;
    }
    role(role) {
        this.user.role = role;
        return this;
    }
    build() {
        return this.user;
    }
}
exports.UserBuilder = UserBuilder;
