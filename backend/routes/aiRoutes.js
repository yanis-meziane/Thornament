import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import aiController from '../controller/aiController.js';

let router = express.Router();

router.get('/test', authMiddleware.isAuth, aiController.testConnection);
router.get('/step-relation/:id', authMiddleware.isAuth, aiController.testCallFunctions);
// router.put('/:id', authMiddleware.isAuth, playerController.modifyPlayer);
// router.delete('/:id', authMiddleware.isAuth, tournamentController.deleteTournament);

export default router;