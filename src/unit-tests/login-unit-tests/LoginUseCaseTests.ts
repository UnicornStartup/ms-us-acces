// import { expect } from 'chai';
// import 'mocha';
// import { mock, when, anything, anyNumber, anyString, anyOfClass, instance, anyFunction, between, objectContaining } from 'ts-mockito';
// import { User } from '../../main/login/domain/models/User';
// import { UserBuilder } from '../../main/login/domain/models/UserBuilder';
// import { LoginUseCase } from '../../main/login/domain/services/LoginUseCase';
// import { LoginInterfaceImpl } from '../../main/login/infraestructure/implementations/LoginRepositoryPostgreSQL';
// import { UserDTOBuilder } from '../../main/login/infraestructure/models/UserDTOBuilder';


// const mockedFoo: LoginInterfaceImpl = mock(LoginInterfaceImpl);

// when(mockedFoo.getLogin(anything())).thenReturn(new UserDTOBuilder()
//     .uuid("5d340b06-0281-4de6-a53a-a7736c2612d0")
//     .email("email@email.com")
//     .username("username")
//     .password("5f4dcc3b5aa765d61d8327deb882cf99")
//     .registrationTimestamp(Date.now())
//     .lastAccesTimestamp(Date.now())
//     .banned(false)
//     .role("admin")
//     .build());

// describe('LoginUseCase.execute',
//     () => {
//         it('Should return reponseBodyView', () => {
//             const usecase = new LoginUseCase();
//             const result: User = usecase.execute(new UserBuilder().build());
//             expect(result.username).to.eql("username");
//         });
//     });