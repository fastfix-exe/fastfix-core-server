import { envConfig } from "../config/env_config"
import * as exception from "../common/exception";
import * as commonEnums from "../common/enum";

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

export function authorizeAdministrator(req: any, res: any, next: any) {
  try {
    // check role or add role to call apis
    if (!req.loginUser) {
      throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
    }
    const bypassApi: string[] = [];
    if (req.loginUser.role !== commonEnums.UserRole.administrator && !bypassApi.some((api: string) => req.originalUrl.startsWith(api))) {
      throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
    }
    next();

  } catch (err) {
    next(err);
  }
}

export function authorizeCustomer(req: any, res: any, next: any) {
  try {
    // check role or add role to call apis
    if (!req.loginUser) {
      throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
    }
    const bypassApi: string[] = [];
    if (req.loginUser.role !== commonEnums.UserRole.customer && !bypassApi.some((api: string) => req.originalUrl.startsWith(api))) {
      throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
    }
    next();

  } catch (err) {
    next(err);
  }
}

export function authorizeStore(req: any, res: any, next: any) {
  try {
    // check role or add role to call apis
    if (!req.loginUser) {
      throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
    }
    const bypassApi: string[] = [];
    if (req.loginUser.role !== commonEnums.UserRole.store && !bypassApi.some((api: string) => req.originalUrl.startsWith(api))) {
      throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
    }
    next();

  } catch (err) {
    next(err);
  }
}