import express from 'express';
import * as authController from "../controllers/authController";

const router = express.Router();

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

export const authRouter = router;