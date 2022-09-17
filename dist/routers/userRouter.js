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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("../controllers/userController"));
const router = express_1.default.Router();
/**
 * @openapi
 * '/api/store/profile':
 *  put:
 *     tags:
 *     - User
 *     summary: Update store's profile (email, storeName, address, phoneNumber, avatarPicture, description)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 description: new email
 *                 type: string
 *               storeName:
 *                 description: new storeName (default current store name)
 *                 type: string
 *               address:
 *                 description: address
 *                 type: string
 *               phoneNumber:
 *                 description: phone num (string max 10 characters)
 *                 type: string
 *               avatarPicture:
 *                 description: new avatar url (default current url)
 *                 type: string
 *               description:
 *                 description: description
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
router.put('/api/store/profile', userController.updateStore);
/**
* @openapi
* '/api/customer/profile':
*  put:
*     tags:
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
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map