import express from 'express';
import playerController from '../controller/playerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

let router = express.Router();

router.post('/', authMiddleware.isAuth, playerController.createPlayer);
router.put('/:id', authMiddleware.isAuth, playerController.modifyPlayer);
// router.get('/:id', authMiddleware.isAuth, tournamentController.getTournamentById);
// router.delete('/:id', authMiddleware.isAuth, tournamentController.deleteTournament);

export default router;