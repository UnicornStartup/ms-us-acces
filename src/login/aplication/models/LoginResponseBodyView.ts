export class LoginResponseBodyView {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public get $token(): string {
        return this.token;
    }

    public set $token(value: string) {
        this.token = value;
    }
}