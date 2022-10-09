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
exports.subsriptionRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("../controllers/userController"));
const subsriptionController = __importStar(require("../controllers/subcriptionController"));
const router = express_1.default.Router();
/**
* @openapi
* '/api/subcription/list':
*  get:
*     tags:
*     - Subcription
*     summary: Get list of subscription
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/subcription/list', subsriptionController.getListAllSubscription);
/**
* @openapi
* '/api/subcription/{subcriptionId}':
*  get:
*     tags:
*     - Subcription
*     summary: Get subcription's infor by ID
*     parameters:
*     - in: path
*       name: subcriptionId
*       required: true
*       schema:
*          type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/subcription/:subcriptionId', subsriptionController.getSubcriptionBySubcriptionId);
/**
* @openapi
* '/api/customer/subcription/':
*  put:
*     tags:
*     - Subcription
*     summary: Update subcription's info
*     security:
*       - bearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               subcriptionId:
*                 description: the Id
*                 type: string
*               name:
*                 description: name (string)
*                 type: string
*               price:
*                 description: price (money)
*                 type: number
*               description:
*                 description: detail info (string max 10 characters)
*                 type: string
*     responses:
*       200:
*         description: Success
*/
router.put('/api/customer/subcription/', userController.updateCustomer);
exports.subsriptionRouter = router;
//# sourceMappingURL=subcriptionRouter.js.map