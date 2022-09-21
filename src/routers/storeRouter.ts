import express from 'express';
import * as userController from "../controllers/userController";

const router = express.Router();
/**
 * @openapi
 * '/api/store/profile':
 *  put:
 *     tags:
 *     - Store
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


export const storeRouter = router;