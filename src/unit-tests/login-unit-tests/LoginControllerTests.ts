import { assert, expect } from "chai";
import "reflect-metadata";
import { mock, when, instance } from "ts-mockito";
import app from '../../main/app';

const chai = require('chai');
const chaiHttp = require('chai-http');

const URL = "http://localhost:3000";
const LOGIN_PATH = "/login";
const SOME_EMAIL = "email@email.com";
const SOME_STATUS: number = 400;

describe("LoginController", async () => {
    it("Should return response with error 'error parsing request body' when email or password are missing", async () => {

        chai.use(chaiHttp);
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL });

        assert.equal(result.status, SOME_STATUS);
    });
});