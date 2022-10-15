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
 *     summary: Get latest request of current login customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/api/customer/request/latest', requestController.getRequestLatest);

 /**
 * @openapi
 * '/api/request/':
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
 *                 description: the request's id
 *                 type: number
 *               status: 
 *                 description: the status
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/api/request/', requestController.UpdateRequestStatus);

  /**
 * @openapi
 * '/api/request/{id}':
 *  get:
 *     tags:
 *     - Request
 *     summary: Get request by request Id
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
 router.get('/api/request/:id', requestController.getRequestById);

  /**
 * @openapi
 * '/api/request/store/{storeId}':
 *  get:
 *     tags:
 *     - Request
 *     summary: Get list of request by store ID
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
   router.get('/api/request/store/:storeId', requestController.getListPendingRequestByStoreId);

/**
 * @openapi
 * '/api/customer/request/position':
 *  post:
 *     tags:
 *     - Request
 *     summary: Change position of customer's side
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coordinates: 
 *                 description: coordinate
 *                 type: string
 *               requestId: 
 *                 description: the request id
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
  router.post('/api/customer/request/position', requestController.customerChangePosition);

  /**
 * @openapi
 * '/api/employee/request/position':
 *  post:
 *     tags:
 *     - Request
 *     summary: Change position of employee's side
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coordinates: 
 *                 description: coordinate
 *                 type: string
 *               requestId: 
 *                 description: the request id
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
   router.post('/api/employee/request/position', requestController.employeeChangePosition);

  export const requestRouter = router;