import "reflect-metadata"
import express from 'express';
import cors from 'cors';
import LoginController from "./login/aplication/Controller/LoginController";
import { container } from "./Configuration";


const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// controllers
app.use('/login', container.resolve(LoginController).routes());


export default app;