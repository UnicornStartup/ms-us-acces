import { Router } from 'express';
import { autoInjectable, inject } from 'tsyringe';
import { ErrorMessages, isError } from '../../../shared/models/HandledError';
import LoginAdapter from '../adapters/LoginAdapter';

@autoInjectable()
export default class LoginRoute {
  adapter: LoginAdapter;
  router: Router;

  constructor(adapter: LoginAdapter) {
    this.adapter = adapter;
    this.router = Router();
  }

  routes() {
    
    this.router.get('/',async (req, res) => {
      
      if (req.body.email == null || req.body.email == null) {
        res.status(400).send(({
          error: ErrorMessages.RequestBodyError,
          resolution: "send expected parameters"
        }));
      } else {
        try {
          await this.adapter.adapt(req.body.email, req.body.password)
            .then(val => {
              if (isError(val)) {
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