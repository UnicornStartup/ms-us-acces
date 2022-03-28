import { expect } from 'chai';
import 'mocha';
import { mock, when, anything, anyNumber, anyString, anyOfClass, instance, anyFunction, between, objectContaining } from 'ts-mockito';
import { LoginAdapter } from '../../main/login/aplication/adapters/LoginAdapter';
import { LoginRequestBodyView } from '../../main/login/aplication/models/LoginRequestBodyView';
import { LoginResponseBodyView } from '../../main/login/aplication/models/LoginResponseBodyView';
import { User } from "../../main/login/domain/models/User";
import { UserBuilder } from '../../main/login/domain/models/UserBuilder';

const mockedFoo: LoginRequestBodyView = mock(LoginRequestBodyView);

when(mockedFoo.toUser(anything())).thenReturn(new UserBuilder().build());

describe('LoginAdapter.adapt', 
  () => { 
    it('Should return reponseBodyView', () => { 
      const adapter = new LoginAdapter();
      const result = adapter.adapt(new LoginRequestBodyView("", ""));
      expect(result instanceof LoginResponseBodyView).to.eql(true); 
  }); 
});