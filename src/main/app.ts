import "reflect-metadata"
import express from 'express';
import cors from 'cors';
import LoginController from "./login/aplication/Controller/LoginController";
import { container } from "./Configuration";
import dotenv from "dotenv"

const app = express();

//enviroment setting
dotenv.config({ path: `enviroments/${process.env.ENV}.env` });

console.log("envi", `${process.env.ENV}`);

// settings
app.set('port', process.env.PORT);

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// controllers
app.use('/login', container.resolve(LoginController).routes());


export default app;