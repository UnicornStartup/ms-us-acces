import { User } from "../../domain/models/User";
import { UserBuilder } from "../../domain/models/UserBuilder";

export class LoginRequestBodyView {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public get $password(): string {
    return this.password;
  }

  public set $email(value: string) {
    this.email = value;
  }

  public toUser(loginRequestBodyView: LoginRequestBodyView): User {
    return new UserBuilder()
      .email(loginRequestBodyView.email)
      .password(loginRequestBodyView.password)
      .build();
  }
}
