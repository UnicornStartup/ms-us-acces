import { assert } from "chai";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { mock, when, instance } from "ts-mockito";
import LoginAdapter from "../../main/login/aplication/adapters/LoginAdapter";
import LoginController from "../../main/login/aplication/Controller/LoginController";
import { LoginResponseBodyView } from "../../main/login/aplication/models/LoginResponseBodyView";

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = express();
const loginAdapter = mock(LoginAdapter);

const LOGIN_PATH = "/login";
const SOME_EMAIL = "email@email.com";
const SOME_PASSWORD = "password"
const SOME_TOKEN = "2a3260e6-b44b-11ec-b909-0242ac120002";
const SOME_STATUS: number = 400;

describe("LoginController", async () => {
    before(() => {
        console.log("me ejecuto before");
        app.use(cors());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.listen(3001);
        const loginController = new LoginController(instance(loginAdapter));
        app.use('/login', loginController.routes());
    });

    it("Should return response with error 'error parsing request body' when email or password are missing", async () => {
        chai.use(chaiHttp);
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL });

        assert.equal(result.status, SOME_STATUS);
    });

    it("Should return response with token when email and password are in body, and user in database exists", async () => {
        when(loginAdapter.adapt(SOME_EMAIL, SOME_PASSWORD)).thenResolve(new LoginResponseBodyView(SOME_TOKEN));
        chai.use(chaiHttp);
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL, password: SOME_PASSWORD });

        console.log(result.body);
        assert.equal(result.body.token, SOME_TOKEN);
    });

    it("asdf", async () => {
        when(loginAdapter.adapt(SOME_EMAIL, SOME_PASSWORD)).thenResolve(new LoginResponseBodyView(SOME_TOKEN));
        chai.use(chaiHttp);
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL, password: SOME_PASSWORD });

        console.log(result.body);
        assert.equal(result.body.token, SOME_TOKEN);
    });
});