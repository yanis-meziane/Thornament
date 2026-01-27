import express from 'express';
import userController from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

let router = express.Router();

router.get('/:id', authMiddleware.isAuth, userController.getUserById);

export default router;