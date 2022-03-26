import { UserDTOBuilder } from "../../infraestructure/models/UserDTOBuilder";
import { User } from "./User";

export class UserBuilder {
    private readonly user: User;

    constructor() {
        this.user = {
            id: -1,
            uuid: "",
            token: "",
            email: "",
            username: "",
            password: "",
            registrationTimestamp: 0,
            lastAccesTimestamp: 0,
            banned: false,
            role: ""
        };
    }

    id(id: number): UserBuilder{
        this.user.id = id;
        return this;
    }

    uuid(uuid: string): UserBuilder {
        this.user.uuid = uuid;
        return this;
    }

    token(token: string): UserBuilder{
        this.user.token = token;
        return this;
    }

    email(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    username(username: string): UserBuilder {
        this.user.username = username;
        return this;
    }

    password(password: string): UserBuilder {
        this.user.password = password;
        return this;
    }

    registrationTimestamp(registrationTimestamp: number): UserBuilder {
        this.user.registrationTimestamp = registrationTimestamp;
        return this;
    }

    lastAccesTimestamp(lastAccesTimestamp: number): UserBuilder {
        this.user.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }

    banned(banned: boolean): UserBuilder {
        this.user.banned = banned;
        return this;
    }

    role(role: string): UserBuilder {
        this.user.role = role;
        return this;
    }

    build(): User {
        return this.user;
    }
}