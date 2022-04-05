import "reflect-metadata";
import { assert, expect } from "chai";
import { mock, when, instance } from "ts-mockito";
import LoginAdapter from "../../main/login/aplication/adapters/LoginAdapter";
import { UserBuilder } from "../../main/login/domain/models/UserBuilder";
import LoginUseCase from "../../main/login/domain/services/LoginUseCase";
import { LoginResponseBodyView } from "../../main/login/aplication/models/LoginResponseBodyView";
import { User } from "../../main/login/domain/models/User";
import { ErrorMessages, HandledError } from "../../main/shared/models/HandledError";

const SOME_EMAIL = "email@email.com";
const SOME_PASSWORD = "password";
const SOME_TOKEN = "2a3260e6-b44b-11ec-b909-0242ac120002";
const SOME_RESOLUTION_MESSAGE = "Login Adapter Resolution Message.";

describe("LoginAdapter", async () => {
  it("Should return reponseBodyView when email and password was correctly", async () => {
    const user: User = new UserBuilder().token(SOME_TOKEN).build();
    const useCase: LoginUseCase = mock(LoginUseCase);
    when(useCase.execute(SOME_EMAIL, SOME_PASSWORD)).thenResolve(user);
    const adapter: LoginAdapter = new LoginAdapter(instance(useCase));

    let result = await adapter.adapt(SOME_EMAIL, SOME_PASSWORD);

    
    assert.isTrue(result instanceof LoginResponseBodyView);
    result = result as LoginResponseBodyView;
    assert.equal(result.token, SOME_TOKEN);
  });

  it("Should return HandledError when somethings Worong", async () => {
  
    const error: HandledError = new HandledError(ErrorMessages.UnexpectedError, SOME_RESOLUTION_MESSAGE);
    const useCase: LoginUseCase = mock(LoginUseCase);
    when(useCase.execute(SOME_EMAIL, SOME_PASSWORD)).thenResolve(error);
    const adapter: LoginAdapter = new LoginAdapter(instance(useCase));

    let result = await adapter.adapt(SOME_EMAIL, SOME_PASSWORD);

    assert.isTrue(result instanceof HandledError);
    result = result as HandledError;
    assert.equal(result.message, ErrorMessages.UnexpectedError);
    assert.equal(result.resolution, SOME_RESOLUTION_MESSAGE);
  });
});
