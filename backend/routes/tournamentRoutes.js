import express from 'express';
import tournamentController from '../controller/tournamentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

let router = express.Router();

// tdo
router.post('/', authMiddleware.isAuth, tournamentController.createTournament);
router.get('/', authMiddleware.isAuth, tournamentController.getAllTournaments);
router.get('/:id', authMiddleware.isAuth, tournamentController.getTournamentById);
router.delete('/:id', authMiddleware.isAuth, tournamentController.deleteTournament);

export default router;