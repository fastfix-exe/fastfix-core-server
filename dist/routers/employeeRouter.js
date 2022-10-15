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
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const employeeController = __importStar(require("../controllers/employeeController"));
const router = express_1.default.Router();
/**
* @openapi
* '/api/employee/list/{storeId}':
*  get:
*     tags:
*     - Employee
*     summary: Get store's list of all employees by store ID
*     parameters:
*     - in: path
*       name: storeId
*       required: true
*       schema:
*          type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/employee/list/:storeId', employeeController.getListEmployeeByStoreId);
/**
* @openapi
* '/api/user/employee/{employeeId}':
*  get:
*     tags:
*     - Employee
*     summary: Get employee by employeeId
*     parameters:
*     - in: path
*       name: employeeId
*       required: true
*       schema:
*          type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/user/employee/:employeeId', employeeController.getEmployeeByEmployeeId);
/**
* @openapi
* '/api/request/store/employee/{requestId}':
*  get:
*     tags:
*     - Employee
*     summary: Get employee of store who are processing request by request Id
*     parameters:
*     - in: path
*       name: requestId
*       required: true
*       schema:
*          type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/user/employee/request/:requestId', employeeController.getEmployeeByCurrentRequestId);
exports.employeeRouter = router;
//# sourceMappingURL=employeeRouter.js.map