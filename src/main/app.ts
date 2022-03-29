import "reflect-metadata"
import express from 'express';
import cors from 'cors';
import { container } from 'tsyringe';
import { LoginRoute } from './login/aplication/routes/LoginRoute';


const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/login', container.resolve(LoginRoute).routes());


export default app;