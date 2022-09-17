import { envConfig } from "../config/env_config"
import * as exception from "../common/exception";

import * as jwt from 'jsonwebtoken';
const bypassApi: string[] = ['/api/healthcheck', '/api/auth/google', '/api/auth/token', '/docs.json', '/docs', '/favicon.ico', '/api/auth/store'];

export function validateToken(req: any, res: any, next: any) {
  if (bypassApi.some((api: string) => req.originalUrl.startsWith(api))) {
    next();
  } else {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //format: Bearer {{token}}
    if (token == null) {
      throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
    }

    jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      if (err) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, err.message);
      }
      req.loginUser = user;
      next();
    });
  }
}