import express from "express";
import cors from "cors";
import { authRouter } from "./routers/authRouter";
import { storeRouter } from "./routers/storeRouter";
import { customerRouter } from "./routers/customerRouter";
import { swaggerRouter } from "./routers/swaggerRouter";
import * as exception from "./common/exception";
import { logger } from "./config/log4js_config";
import { envConfig } from "./config/env_config";
import cookieParser from "cookie-parser";
import http from "http";
import * as authMiddleware from "./middlewares/authMiddleware";
import * as commonEnums from "./common/enum";
import { subsriptionRouter } from "./routers/subcriptionRouter";

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// xác thực và gán thông tin loginUser vào request attribute
app.use("/*", authMiddleware.validateToken, function (req: any, res: any, next: any) {
  res.header('Cache-Control', ['private', 'max-age=0', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
  res.header('no-cache', 'Set-Cookie');
  res.header('Expires', new Date(new Date("1970-01-01 00:00:00")).toUTCString());
  res.header('Pragma', 'no-cache');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});

app.use("/api/adm/*", authMiddleware.authorizeAdministrator);

app.use("/api/customer/*", authMiddleware.authorizeCustomer);

app.use("/api/store/*", authMiddleware.authorizeStore);
app.use(swaggerRouter);

app.use(authRouter);
app.use(storeRouter);
app.use(customerRouter);
app.use(subsriptionRouter);

// không tìm thấy đường dẫn api
function notFoundErrorHandler(req: any, res: any, next: any) {
  var err = new exception.APIException(exception.HttpStatusCode.CLIENT_NOT_FOUND, exception.ErrorMessage.API_E_001);
  next(err);
}

// log lỗi
function logErrors(err: any, req: any, res: any, next: any) {
  logger.addContext("url", req.originalUrl)
  logger.error(err.message);
  next(err);
}

// error handler
function errorHandler(err: any, req: any, res: any, next: any) {
  if (!err) {
    return;
  }
  if (!err.type) {
    err.type = exception.HttpStatusCode.SERVER;
    err.message = exception.ErrorMessage.API_E_002;
  }
  var errObject = exception.createErrorJsonObject(err);
  res.status(err.type);
  res.json(errObject);
}

app.use(notFoundErrorHandler);
app.use(logErrors);
app.use(errorHandler);

// chạy server local
app.listen(envConfig.PORT, () => {
  console.log("Server is running on: http://localhost:" + envConfig.PORT);
});

export default app;