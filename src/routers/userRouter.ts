import express from 'express';
import * as customerController from "../controllers/customerController";
import * as userController from "../controllers/userController";

const router = express.Router();

 /**
 * @openapi
 * '/api/user/store/comment/{storeId}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get store's comment by store ID
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
router.get('/api/user/store/comment/:storeId', userController.getCommentOfStoreByStoreId);

/**
 * @openapi
 * '/api/user/store/comment/{storeId}':
 *  post:
 *     tags:
 *     - User
 *     summary: Comment a store (or reply)
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
 *               content: 
 *                 description: content of comment
 *                 type: string
 *               replyId: 
 *                 description: parent comment Id (if user are replying a comment) (not required)
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/api/user/store/comment/:storeId', userController.insertCommentOfStoreByStoreId);

 /**
 * @openapi
 * '/api/user/store/rating/{storeId}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get store's rating by store ID
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
router.get('/api/user/store/rating/:storeId', userController.getRatingOfStoreByStoreId);

export const userRouter = router;