import { Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { ErrorMessages, isError } from '../../../shared/models/HandledError';
import { LoginAdapter } from '../adapters/LoginAdapter';

@autoInjectable()
export class LoginRoute {
  adapter: LoginAdapter;
  router: Router;

  constructor(adapter: LoginAdapter) {
    this.router = Router();
    this.adapter = adapter;
  }

  routes() {
    this.router.get('/', async (req, res) => {
      if (req.body.email == null || req.body.email == null) {
        res.status(400).send(({
          error: ErrorMessages.RequestBodyError,
          resolution: "send expected parameters"
        }));
      } else {
        try {
          this.adapter.adapt(await req.body.email, req.body.password)
            .then(val => {
              console.log("val es " , val);
              if (isError(val)) {
                console.log(val);
                switch (val.message) {
                  case (ErrorMessages.DBUserNotFound): {
                    res.status(401).send({
                      error: val.message,
                      resolution: val.resolution
                    });
                    break;
                  }
                  case (ErrorMessages.DBIncoherenceError):
                  case (ErrorMessages.DBError): {
                    res.status(500).send({
                      error: val.message
                    });
                    break;
                  }
                }
              } else {
                console.log("Hola ", val)
                res.status(200).send(val);
              }
            });
        } catch (e) {
          res.status(500).send({
            error: ErrorMessages.ServerError
          });
        }
      }
    });
    return this.router;
  }

}