import { Router } from 'express';
import { ErrorMessages, isError } from '../../../shared/models/HandledError';
import { LoginAdapter } from '../adapters/LoginAdapter';

const router = Router();
const adapter = new LoginAdapter();

router.get('/login', async (req, res) => {
  if (req.body.email == null || req.body.email == null) {
    return res.status(400).json({
      error: ErrorMessages.RequestBodyError,
      resolution: "send expected parameters"
    });
  }
  try {
    adapter.adapt(await req.body.email, req.body.password)
      .then(val => {
        console.log(val);
        if (isError(val)) {
          switch (val.message) {
            case (ErrorMessages.DBUserNotFound): {
              res.status(401).json({
                error: val.message,
                resolution: val.resolution
              });
              break;
            }
            case (ErrorMessages.DBIncoherenceError):
            case (ErrorMessages.DBError): {
              res.status(500).json({
                error: val.message
              });
              break;
            }
          }
        } else {
          res.status(200).json(val);
        }
      });
    return res;
  } catch (e) {
    return res.status(500)
      .json({
        error: ErrorMessages.ServerError
      });
  }
});

export default router;