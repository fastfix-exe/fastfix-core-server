import express from 'express';
import * as userController from "../controllers/userController";

const router = express.Router();
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


export const userRouter = router;