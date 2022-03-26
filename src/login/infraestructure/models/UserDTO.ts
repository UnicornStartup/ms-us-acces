import { User } from "../../domain/models/User";
import { UserBuilder } from "../../domain/models/UserBuilder";

export interface UserDTO {

    id: number;
    uuid: string;
    token: string;
    email: string;
    username: string;
    password: string;
    registrationTimestamp: number;
    lastAccesTimestamp: number;
    banned: boolean;
    role: string;
}