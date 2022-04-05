import "reflect-metadata";
import { assert, expect } from "chai";
import { mock, when, instance } from "ts-mockito";
import LoginAdapter from "../../main/login/aplication/adapters/LoginAdapter";
import LoginUseCase from "../../main/login/domain/services/LoginUseCase";
import { ErrorMessages, HandledError } from "../../main/shared/models/HandledError";
import { LoginRepository } from "../../main/login/domain/repository/LoginRepository";
import LoginRepositoryPostgreSQL from "../../main/login/infraestructure/implementations/LoginRepositoryPostgreSQL";
import { UserDTOBuilder } from "../../main/login/infraestructure/models/UserDTOBuilder";
import { UserDTO } from "../../main/login/infraestructure/models/UserDTO";
import { typeInfo } from "tsyringe/dist/typings/dependency-container";
import { User } from "../../main/login/domain/models/User";

const SOME_EMAIL = "email@email.com";
const SOME_PASSWORD = "password";
const SOME_TOKEN = "2a3260e6-b44b-11ec-b909-0242ac120002";
const SOME_RESOLUTION_MESSAGE = "Login Adapter Resolution Message.";

describe("LoginUseCase", async () => {
  it("Should return user when email and password was correctly", async () => {
    const userDTO: UserDTO = new UserDTOBuilder().token(SOME_TOKEN).build();
    const repository: LoginRepository = mock(LoginRepositoryPostgreSQL);
    when(repository.getLogin(SOME_EMAIL, SOME_PASSWORD)).thenResolve(userDTO);
    const useCase: LoginUseCase = new LoginUseCase(instance(repository));

    let result = await useCase.execute(SOME_EMAIL, SOME_PASSWORD);

    assert.instanceOf(result, User);
    result = result as User;
    assert.equal(result.token, SOME_TOKEN);
  });

  it("Should return HandledError when somethings Worong", async () => {

    const error: HandledError = new HandledError(ErrorMessages.UnexpectedError, SOME_RESOLUTION_MESSAGE);
    const repository: LoginRepository = mock(LoginRepositoryPostgreSQL);
    when(repository.getLogin(SOME_EMAIL, SOME_PASSWORD)).thenResolve(error);
    const useCase: LoginUseCase = new LoginUseCase(instance(repository));

    let result = await useCase.execute(SOME_EMAIL, SOME_PASSWORD);

    assert.instanceOf(result, HandledError);
    result = result as HandledError;
    assert.equal(result.message, ErrorMessages.UnexpectedError);
    assert.equal(result.resolution, SOME_RESOLUTION_MESSAGE);
  });
});
