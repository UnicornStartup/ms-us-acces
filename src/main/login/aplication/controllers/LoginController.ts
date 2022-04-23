import LoginAdapter from '../adapters/LoginAdapter';
import { Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { ErrorMessages, isError } from '../../../shared/domain/models/HandledError';
import { LogServiceOpenSearch } from '../../../shared/infraestructure/LogServiceOpenSearch';
import { LogModel } from '../../../shared/domain/models/LogModel';

@autoInjectable()
export default class LoginController {
  adapter: LoginAdapter;
  router: Router;

  constructor(adapter: LoginAdapter) {
    this.adapter = adapter;
    this.router = Router();
  }

  routes() {
    this.router.get('/', async (req, res) => {
      if (req.body.email == null || req.body.password == null) {
        //LogServiceOpenSearch.error(new LogModel());
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
                  case (ErrorMessages.LoginUserNotFound): {
                    res.status(401).send({
                      error: val.message,
                      resolution: val.resolution
                    });
                    break;
                  }
                  case (ErrorMessages.DBIncoherenceError):
                  case (ErrorMessages.DBError):
                  case (ErrorMessages.UnexpectedError): {
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