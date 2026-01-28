import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import tournamentRoutes from './tournamentRoutes.js';

let router = express.Router();

// Mount routes
// router.get('/test', test)
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/tournaments', tournamentRoutes);

export default router;