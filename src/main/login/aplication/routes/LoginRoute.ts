import { Router } from 'express';
import { LoginAdapter } from '../adapters/LoginAdapter';
import { LoginRequestBodyView } from '../models/LoginRequestBodyView';
const router = Router();

const adapter = new LoginAdapter();

router.get('/login', async (req, res) => {
  if (req.body.email == null || req.body.email == null) {
    return res.status(400).json("Error: bad parameters.");
  }
  try {
    adapter.adapt(await new LoginRequestBodyView(req.body.email, req.body.password))
      .then(val => {
        if (isError(val)) {
          switch (val.message) {
            case (ErrorMessages.DBUserNotFound): {
              res.status(401).json("Error: " + ErrorMessages.DBUserNotFound);
              break;
            }
            case (ErrorMessages.DBIncoherenceError): {
              res.status(500).json("Error: " + ErrorMessages.DBIncoherenceError);
            }

            case (ErrorMessages.DBError): {
              res.status(500).json("Error: internal database error.");
            }
          }
        } else {
          res.status(200).json(val);
        }
      });
    return res;
  } catch (e) {
    return res.status(500)
      .json("Error: internal server error.");
  }
});

export default router;