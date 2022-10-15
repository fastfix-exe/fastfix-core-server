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
exports.requestRouter = void 0;
const express_1 = __importDefault(require("express"));
const requestController = __importStar(require("../controllers/requestController"));
const router = express_1.default.Router();
/**
 * @openapi
 * '/api/customer/request/':
 *  post:
 *     tags:
 *     - Request
 *     summary: Create Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 description: the user id
 *                 type: string
 *               storeId:
 *                 description: the store id
 *                 type: string
 *               type:
 *                 description: request type
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/customer/request/', requestController.createRequest);
/**
* @openapi
* '/api/customer/request/latest':
*  get:
*     tags:
*     - Request
*     summary: Get latest request of current login customer
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/customer/request/latest', requestController.getRequestLatest);
/**
* @openapi
* '/api/request/':
*  put:
*     tags:
*     - Request
*     summary: Update Request
*     security:
*       - bearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 description: the request's id
*                 type: number
*               status:
*                 description: the status
*                 type: number
*     responses:
*       200:
*         description: Success
*/
router.put('/api/request/', requestController.UpdateRequestStatus);
/**
* @openapi
* '/api/request/':
*  post:
*     tags:
*     - Request
*     summary: store assign employee for Request
*     security:
*       - bearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               requestId:
*                 description: the request's id
*                 type: number
*               employeeId:
*                 description: the employeeId
*                 type: string
*     responses:
*       200:
*         description: Success
*/
router.post('/api/request/employee/', requestController.assignEmployeeForRequest);
/**
* @openapi
* '/api/request/{id}':
*  get:
*     tags:
*     - Request
*     summary: Get request by request Id
*     parameters:
*     - in: path
*       name: id
*       required: true
*       schema:
*          type: number
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/request/:id', requestController.getRequestById);
/**
* @openapi
* '/api/request/store/{storeId}':
*  get:
*     tags:
*     - Request
*     summary: Get list of request by store ID
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
router.get('/api/request/store/:storeId', requestController.getListPendingRequestByStoreId);
/**
 * @openapi
 * '/api/customer/request/position':
 *  post:
 *     tags:
 *     - Request
 *     summary: Change position of customer's side
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coordinates:
 *                 description: coordinate
 *                 type: string
 *               requestId:
 *                 description: the request id
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/customer/request/position', requestController.customerChangePosition);
/**
* @openapi
* '/api/employee/request/position':
*  post:
*     tags:
*     - Request
*     summary: Change position of employee's side
*     security:
*       - bearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               coordinates:
*                 description: coordinate
*                 type: string
*               requestId:
*                 description: the request id
*                 type: string
*     responses:
*       200:
*         description: Success
*/
router.post('/api/employee/request/position', requestController.employeeChangePosition);
exports.requestRouter = router;
//# sourceMappingURL=requestRouter.js.map