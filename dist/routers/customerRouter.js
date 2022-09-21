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
exports.customerRouter = void 0;
const express_1 = __importDefault(require("express"));
const customerController = __importStar(require("../controllers/customerController"));
const userController = __importStar(require("../controllers/userController"));
const router = express_1.default.Router();
/**
* @openapi
* '/api/customer/profile':
*  put:
*     tags:
*     - Customer
*     - User
*     summary: Update customer's profile (name, gender, date of birth, phone number, avatar)
*     security:
*       - bearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               customerName:
*                 description: new user name (default current customer name)
*                 type: string
*               dateOfBirth:
*                 description: birth day (string)
*                 type: string
*               gender:
*                 description: gender (male 1, female 2, other 0)
*                 type: number
*               phoneNumber:
*                 description: phone num (string max 10 characters)
*                 type: string
*               avatarPicture:
*                 description: new avatar url (default current url)
*                 type: string
*               refreshToken:
*                 description: current refresh token for logging out
*                 type: string
*             required:
*               - refreshToken
*     responses:
*       200:
*         description: Success
*/
router.put('/api/customer/profile', userController.updateCustomer);
/**
* @openapi
* '/api/customer/store/list':
*  get:
*     tags:
*     - Customer
*     summary: Get list of available store
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/customer/store/list', customerController.getListStore);
/**
* @openapi
* '/api/customer/store/{storeId}':
*  get:
*     tags:
*     - Customer
*     summary: Get store's infor by ID
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*/
router.get('/api/customer/store/:storeId', customerController.getStoreByStoreId);
exports.customerRouter = router;
//# sourceMappingURL=customerRouter.js.map