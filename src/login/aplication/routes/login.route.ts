import { Router } from 'express';
import { LoginAdapter } from '../adapters/login.adapter';
import { LoginRequestBodyView } from '../models/LoginRequestBodyView';

const router = Router();

const adapter = new LoginAdapter();

router.get('/login', async (req, res) => {
  try {
    console.log("request body" , req.body);
    const response = adapter.adapt(new LoginRequestBodyView(req.body.email, req.body.password))
    return res.status(200)
      .json(response);
  } catch (e) {
    return res.status(404).json("internal server error");
  }
});

export default router;