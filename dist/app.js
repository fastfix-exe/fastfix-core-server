"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = require("./routers/authRouter");
const storeRouter_1 = require("./routers/storeRouter");
const customerRouter_1 = require("./routers/customerRouter");
const userRouter_1 = require("./routers/userRouter");
const employeeRouter_1 = require("./routers/employeeRouter");
const swaggerRouter_1 = require("./routers/swaggerRouter");
const exception = __importStar(require("./common/exception"));
const log4js_config_1 = require("./config/log4js_config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const authMiddleware = __importStar(require("./middlewares/authMiddleware"));
const subcriptionRouter_1 = require("./routers/subcriptionRouter");
const requestRouter_1 = require("./routers/requestRouter");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(express_1.default.json({ limit: '50mb' }));
// xác thực và gán thông tin loginUser vào request attribute
app.use("/*", authMiddleware.validateToken, function (req, res, next) {
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
// store will bypass apis start with /api/employee/
app.use("/api/store/*", authMiddleware.authorizeStore);
app.use("/api/employee/*", authMiddleware.authorizeEmployee);
app.use(swaggerRouter_1.swaggerRouter);
app.use(authRouter_1.authRouter);
app.use(storeRouter_1.storeRouter);
app.use(customerRouter_1.customerRouter);
app.use(subcriptionRouter_1.subsriptionRouter);
app.use(requestRouter_1.requestRouter);
app.use(userRouter_1.userRouter);
app.use(employeeRouter_1.employeeRouter);
// không tìm thấy đường dẫn api
function notFoundErrorHandler(req, res, next) {
    var err = new exception.APIException(exception.HttpStatusCode.CLIENT_NOT_FOUND, exception.ErrorMessage.API_E_001);
    next(err);
}
// log lỗi
function logErrors(err, req, res, next) {
    log4js_config_1.logger.addContext("url", req.originalUrl);
    log4js_config_1.logger.error(err.message);
    next(err);
}
// error handler
function errorHandler(err, req, res, next) {
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
const server = new http_1.default.Server(app);
const io = (new socket_io_1.Server({
    cors: {
        origin: process.env.DOMAIN
    }
})).listen(server);
server.listen(process.env.PORT || 3000);
console.log("PORT: 3000");
io.on("connection", function (socket) {
    console.log('client connected!');
    socket.on("disconnect", function () {
        console.log("Socket IO disconnected!");
    });
    //server lắng nghe dữ liệu từ client
    socket.on("Client-sent-data", function (data) {
        //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        socket.emit("Server-sent-data", data);
    });
});
app.set('socketio', io);
exports.default = server;
//# sourceMappingURL=app.js.map