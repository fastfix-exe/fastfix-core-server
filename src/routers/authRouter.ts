import express from 'express';
import * as authController from "../controllers/authController";

const router = express.Router();

/**
 * @openapi
 * '/api/auth/customer':
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Get gooogle login's URL
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: string
 */
router.get('/api/auth/customer', authController.getGoogleLoginUrl);

// app.get('/api/auth/store', googleAuth.loginWithGoogle);
// app.get('/api/auth/adm', googleAuth.loginWithGoogle);

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
 * '/api/customer/profile':
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Decode access token to JSON object (test)
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
router.get('/api/customer/profile', authController.getLoginUserInfor);

export const authRouter = router;

