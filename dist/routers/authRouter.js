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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const router = express_1.default.Router();
/**
 * @openapi
 * '/api/auth/google':
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Get gooogle login's URL (for customer or admin)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: string
 */
router.get('/api/auth/google', authController.getGoogleLoginUrl);
router.get('/api/auth/google/callback', authController.callbackGoogle);
/**
 * @openapi
 * '/api/auth/logout':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Logout (delete refresh token from DB)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 description: stored refresh token
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/auth/logout', authController.logout);
/**
 * @openapi
 * '/api/auth/google':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login via credential ID (role customer or admin)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credentialId:
 *                 type: string
 *             required:
 *               - credentialId
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/auth/google', authController.loginWithCredentialId);
/**
 * @openapi
 * '/api/auth/token':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Generate access token from refresh token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 description: stored refresh token
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 */
router.post('/api/auth/token', authController.generateAccessTokenFromRefreshToken);
/**
 * @openapi
 * '/api/auth/user/profile':
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Decode access token to JSON object
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get('/api/auth/user/profile', authController.getLoginUserInfor);
/**
 * @openapi
 * '/api/auth/store':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login role store
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loginId:
 *                 description: username of store
 *                 type: string
 *               password:
 *                 description: password
 *                 type: string
 *             required:
 *               - loginId
 *               - password
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.post('/api/auth/store', authController.loginRoleStore);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map