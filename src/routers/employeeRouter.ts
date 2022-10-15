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

export const employeeRouter = router;