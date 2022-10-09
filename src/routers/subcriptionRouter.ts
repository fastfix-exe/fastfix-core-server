import express from 'express';
import * as customerController from "../controllers/customerController";
import * as userController from "../controllers/userController";
import * as subsriptionController from "../controllers/subcriptionController";

const router = express.Router();
 /**
 * @openapi
 * '/api/subcription/list':
 *  get:
 *     tags:
 *     - Subcription
 *     summary: Get list of subscription
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/api/subcription/list', subsriptionController.getListAllSubscription);

 /**
 * @openapi
 * '/api/subcription/{subcriptionId}':
 *  get:
 *     tags:
 *     - Subcription
 *     summary: Get subcription's infor by ID
 *     parameters:
 *     - in: path
 *       name: subcriptionId
 *       required: true
 *       schema:
 *          type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/api/subcription/:subcriptionId', subsriptionController.getSubcriptionBySubcriptionId);

   /**
 * @openapi
 * '/api/customer/subcription/':
 *  put:
 *     tags:
 *     - Subcription
 *     summary: Update subcription's info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subcriptionId: 
 *                 description: the Id
 *                 type: string
 *               name: 
 *                 description: name (string)
 *                 type: string
 *               price: 
 *                 description: price (money)
 *                 type: number
 *               description: 
 *                 description: detail info (string max 10 characters)
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/api/customer/subcription/', userController.updateCustomer);

  

  export const subsriptionRouter = router;