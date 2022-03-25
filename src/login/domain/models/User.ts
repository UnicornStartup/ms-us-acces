export interface User {
    id: number,
    uuid : string;
    email : string;
    username: string;
    password : string;
    registrationTimestamp : number;
    lastAccesTimestamp : number;
    banned : boolean;
    role : string;
}