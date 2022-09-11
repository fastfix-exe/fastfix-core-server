import express from 'express';
import * as authenticationController from "./controllers/AuthenticationController";

import swaggerSpec from './services/swagger/swagger';
import * as swaggerUi from 'swagger-ui-express';

const router = express.Router();

/**
 * @openapi
 * '/api/auth/customer':
 *  get:
 *     tags:
 *     - customer
 *     summary: get gooogle login's URL
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 */
router.get('/api/auth/customer', authenticationController.getGoogleLoginUrl);
// app.get('/api/auth/store', googleAuth.loginWithGoogle);
// app.get('/api/auth/adm', googleAuth.loginWithGoogle);
router.get('/api/auth/google/callback', authenticationController.callbackGoogle);
router.post('/api/auth/logout', authenticationController.logout);
router.post('/api/auth/token', authenticationController.generateAccessTokenFromRefreshToken);
router.get('/api/customer/profile', authenticationController.getLoginUserInfor);

// Swagger Page
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(swaggerSpec)

// Documentation in JSON format
router.get('/docs.json', (req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

export { router };
