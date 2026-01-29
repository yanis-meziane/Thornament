import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import stepComponentController from '../controller/stepComponentController.js';

let router = express.Router();

router.post('/br', authMiddleware.isAuth, stepComponentController.createBR);
router.get('/br/:id', authMiddleware.isAuth, stepComponentController.getAllBRByStepId);
router.put('/br/:id', authMiddleware.isAuth, stepComponentController.modifyBR);

export default router;