import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import stepComponentController from '../controller/stepComponentController.js';

let router = express.Router();

// br
router.post('/br', authMiddleware.isAuth, stepComponentController.createBR);
router.get('/br/:id', authMiddleware.isAuth, stepComponentController.getAllBRByStepId);
router.put('/br/:id', authMiddleware.isAuth, stepComponentController.modifyBR);
router.delete('/br/:id', authMiddleware.isAuth, stepComponentController.deleteBR);

// versus
router.post('/versus', authMiddleware.isAuth, stepComponentController.createVersus);
router.get('/versus/:id', authMiddleware.isAuth, stepComponentController.getAllVersusByStepId);
router.put('/versus/:id', authMiddleware.isAuth, stepComponentController.modifyVersus);
router.delete('/versus/:id', authMiddleware.isAuth, stepComponentController.deleteVersus);

// tree
router.post('/tree', authMiddleware.isAuth, stepComponentController.createVersusTree);
router.get('/tree/:id', authMiddleware.isAuth, stepComponentController.getAllVersusTreeByStepId);
router.put('/tree/:id', authMiddleware.isAuth, stepComponentController.modifyVersusTree);
router.delete('/tree/:id', authMiddleware.isAuth, stepComponentController.deleteVersusTree);

export default router;