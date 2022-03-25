import { User } from "../../domain/models/User";
import { UserBuilder } from "../../domain/models/UserBuilder";
import { UserDTO } from "./UserDTO";

export class UserDTOBuilder{
    private readonly userDTO: UserDTO;

    constructor() {
        this.userDTO = {
            uuid: "",
            email: "",
            username: "",
            password: "",
            registrationTimestamp: 0,
            lastAccesTimestamp: 0,
            banned: false,
            role: ""
        };
    }

    uuid(uuid: string): UserDTOBuilder {
        this.userDTO.uuid = uuid;
        return this;
    }

    email(email: string): UserDTOBuilder {
        this.userDTO.email = email;
        return this;
    }

    username(username: string): UserDTOBuilder {
        this.userDTO.username = username;
        return this;
    }

    password(password: string): UserDTOBuilder {
        this.userDTO.password = password;
        return this;
    }

    registrationTimestamp(registrationTimestamp: number): UserDTOBuilder {
        this.userDTO.registrationTimestamp = registrationTimestamp;
        return this;
    }

    lastAccesTimestamp(lastAccesTimestamp: number): UserDTOBuilder {
        this.userDTO.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }

    banned(banned: boolean): UserDTOBuilder {
        this.userDTO.banned = banned;
        return this;
    }

    role(role: string): UserDTOBuilder {
        this.userDTO.role = role;
        return this;
    }

    build(): UserDTO {
        return this.userDTO;
    }

    toUser(userDTO: UserDTO): User {
        return new UserBuilder()
            .uuid(userDTO.uuid)
            .email(userDTO.email)
            .username(userDTO.username)
            .password(userDTO.password)
            .registrationTimestamp(userDTO.registrationTimestamp)
            .lastAccesTimestamp(userDTO.lastAccesTimestamp)
            .banned(userDTO.banned)
            .role(userDTO.role)
            .build();
    };
}