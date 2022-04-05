import "reflect-metadata";
import { container } from "tsyringe";
import LoginRepositoryPostgreSQL from "./login/infraestructure/implementations/LoginRepositoryPostgreSQL";

container.register("LoginRepository", {
    useClass: LoginRepositoryPostgreSQL
});

export { container };