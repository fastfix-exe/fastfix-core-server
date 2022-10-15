import express from 'express';
import * as employeeController from "../controllers/employeeController";

const router = express.Router();

 /**
 * @openapi
 * '/api/employee/list/{storeId}':
 *  get:
 *     tags:
 *     - Employee
 *     summary: Get store's list of all employees by store ID
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
router.get('/api/employee/list/:storeId', employeeController.getListEmployeeByStoreId);

 /**
 * @openapi
 * '/api/user/employee/{employeeId}':
 *  get:
 *     tags:
 *     - Employee
 *     summary: Get employee by employeeId
 *     parameters:
 *     - in: path
 *       name: employeeId
 *       required: true
 *       schema:
 *          type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/api/user/employee/:employeeId', employeeController.getEmployeeByEmployeeId);

 /**
 * @openapi
 * '/api/request/store/employee/{requestId}':
 *  get:
 *     tags:
 *     - Employee
 *     summary: Get employee of store who are processing request by request Id
 *     parameters:
 *     - in: path
 *       name: requestId
 *       required: true
 *       schema:
 *          type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/api/user/employee/request/:requestId', employeeController.getEmployeeByCurrentRequestId);

export const employeeRouter = router;