import express from 'express';
import cors from 'cors';

import loginRoutes from './login/aplication/routes/LoginRoute';


const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(loginRoutes);


export default app;