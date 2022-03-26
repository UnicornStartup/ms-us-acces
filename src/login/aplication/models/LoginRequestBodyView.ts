import { User } from "../../domain/models/User";
import { UserBuilder } from "../../domain/models/UserBuilder";

export class LoginRequestBodyView {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  toUser(loginRequestBodyView: LoginRequestBodyView): User {
    return new UserBuilder()
      .email(loginRequestBodyView.email)
      .password(loginRequestBodyView.password)
      .build();
  }
}
