import express from 'express';
import * as customerController from "../controllers/customerController";
import * as userController from "../controllers/userController";

const router = express.Router();

 /**
 * @openapi
 * '/api/customer/profile':
 *  put:
 *     tags:
 *     - Customer
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
 *  post:
 *     tags:
 *     - Customer
 *     summary: Get list of store and distance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude: 
 *                 description: current latitude
 *                 type: string
 *               longtitude: 
 *                 description: current longtitude
 *                 type: string
 *             required:
 *               - latitude
 *               - longtitude
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/customer/store/list', customerController.getListNearestStore);

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
router.get('/api/customer/store/:storeId', customerController.getStoreByStoreId);

 /**
 * @openapi
 * '/api/customer/store/{storeId}':
 *  post:
 *     tags:
 *     - Customer
 *     summary: Get list of store and distance
 *     parameters:
 *     - in: path
 *       name: storeId
 *       required: true
 *       schema:
 *          type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude: 
 *                 description: current latitude
 *                 type: string
 *               longtitude: 
 *                 description: current longtitude
 *                 type: string
 *             required:
 *               - latitude
 *               - longtitude
 *     responses:
 *       200:
 *         description: Success
 */
  router.post('/api/customer/store/:storeId', customerController.getStoreAndDistanceByStoreId);

 /**
 * @openapi
 * '/api/customer/store/list':
 *  post:
 *     tags:
 *     - Customer
 *     summary: Get list of store and distance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude: 
 *                 description: current latitude
 *                 type: string
 *               longtitude: 
 *                 description: current longtitude
 *                 type: string
 *             required:
 *               - latitude
 *               - longtitude
 *     responses:
 *       200:
 *         description: Success
 */
  router.post('/api/customer/store/list', customerController.getListNearestStore);

/**
 * @openapi
 * '/api/customer/store/rating/{storeId}':
 *  post:
 *     tags:
 *     - Customer
 *     summary: Rate a store (insert and update)
 *     parameters:
 *     - in: path
 *       name: storeId
 *       required: true
 *       schema:
 *          type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating: 
 *                 description: integer rating
 *                 type: number
 *             required:
 *               - rating
 *     responses:
 *       200:
 *         description: Success
 */
  router.post('/api/customer/store/rating/:storeId', userController.insertOrUpdateRatingOfStoreByStoreId);
   /**
 * @openapi
 * '/api/customer/store/rating/{storeId}':
 *  get:
 *     tags:
 *     - Customer
 *     summary: Get store's current customer's rated star by storeID
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
  router.get('/api/customer/store/rating/:storeId', userController.insertOrUpdateRatingOfStoreByStoreId);
export const customerRouter = router;