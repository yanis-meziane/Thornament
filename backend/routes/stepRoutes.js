import express from 'express';
import stepController from '../controller/stepController.js';
import authMiddleware from '../middleware/authMiddleware.js';

let router = express.Router();

router.post('/', authMiddleware.isAuth, stepController.createStep);
router.get('/', authMiddleware.isAuth, stepController.getAllSteps);
router.get('/:id', authMiddleware.isAuth, stepController.getStepById);
router.get('/tournament/:id', authMiddleware.isAuth, stepController.getAllStepsByTournamentId);
router.put('/settings/:id', authMiddleware.isAuth, stepController.modifySettings);

// TDO : get all step_components (=relation) of a step_id

// router.get('/:id', authMiddleware.isAuth, tournamentController.getTournamentById);
// router.delete('/:id', authMiddleware.isAuth, tournamentController.deleteTournament);

export default router;