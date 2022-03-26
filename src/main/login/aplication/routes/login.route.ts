import { Router } from 'express';
import { LoginAdapter } from '../adapters/login.adapter';
import { LoginRequestBodyView } from '../models/LoginRequestBodyView';

const router = Router();

const adapter = new LoginAdapter();

router.get('/login', async (req, res) => {
  try {
    adapter.adapt(await new LoginRequestBodyView(req.body.email, req.body.password))
      .then(val => res.status(200)
        .json(val));
    return res;
  } catch (e) {
    return res.status(404)
      .json("internal server error");
  }
});

export default router;