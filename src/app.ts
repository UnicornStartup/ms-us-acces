import express from 'express'
import cors from 'cors';

import loginRoutes from './routes/login.routes';


const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(loginRoutes);

app.get('/', (req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
})

export default app;