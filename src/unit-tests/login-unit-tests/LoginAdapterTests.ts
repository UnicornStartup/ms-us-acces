import "reflect-metadata";
import { expect } from 'chai';
import { instance, mock, when } from 'ts-mockito';
import { addSyntheticLeadingComment } from 'typescript';
import LoginAdapter from '../../main/login/aplication/adapters/LoginAdapter';
import { LoginRequestBodyView } from '../../main/login/aplication/models/LoginRequestBodyView';
import { LoginResponseBodyView } from '../../main/login/aplication/models/LoginResponseBodyView';
import { User } from "../../main/login/domain/models/User";
import { UserBuilder } from '../../main/login/domain/models/UserBuilder';
import { HandledError } from "../../main/shared/models/HandledError";
import LoginUseCase from "../../main/login/domain/services/LoginUseCase";

// when(mockedUseCase.execute("email@email.com", "password")).thenReturn(new Promise((resolve, reject) => {
//     resolve(new UserBuilder().token("token").build());
// }));

describe('LoginAdapter.adapt.correct', async () => {
        it('Should return reponseBodyView', () => {
            const mockedAdapter: LoginAdapter = mock(LoginAdapter);
            // const mockedUseCase: LoginUseCase = mock(mockedAdapter.useCase);
            // const actualInstanceOfMock = instance(mockedUseCase).execute("","");
            when(mockedAdapter.useCase.execute("email@email.com", "password")).thenReturn(new Promise((resolve, reject) => {
                resolve(new UserBuilder().token("token").build());
            }));
            
            const result = mockedAdapter.adapt("email@email.com", "password");
            console.log(result);
            expect(result instanceof LoginResponseBodyView).to.eql(true);
        });
    });