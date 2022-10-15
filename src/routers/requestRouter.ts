import express from 'express';
import * as userController from "../controllers/userController";
import * as requestController from "../controllers/requestController"

const router = express.Router();
/**
 * @openapi
 * '/api/customer/request/':
 *  post:
 *     tags:
 *     - Request
 *     summary: Create Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 description: the user id
 *                 type: string
 *               storeId: 
 *                 description: the store id
 *                 type: string
 *               type: 
 *                 description: request type
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/customer/request/', requestController.createRequest);

 /**
 * @openapi
 * '/api/customer/request/latest':
 *  get:
 *     tags:
 *     - Request
 *     summary: Get latest request
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/api/customer/request/latest', requestController.getRequestLatest);

 /**
 * @openapi
 * '/api/customer/request/':
 *  put:
 *     tags:
 *     - Request
 *     summary: Update Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: 
 *                 description: the request id
 *                 type: number
 *               status: 
 *                 description: the status id
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/api/customer/request/', requestController.UpdateRequest);

  /**
 * @openapi
 * '/api/customer/request/{id}':
 *  get:
 *     tags:
 *     - Request
 *     summary: Get request by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *          type: number
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
 router.get('/api/customer/request/:id', requestController.getRequestById);

  /**
 * @openapi
 * '/api/customer/request/store/{storeId}':
 *  get:
 *     tags:
 *     - Request
 *     summary: Get request by ID
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
   router.get('/api/customer/request/store/:storeId', requestController.getListPendingRequestByStoreId);

  export const requestRouter = router;