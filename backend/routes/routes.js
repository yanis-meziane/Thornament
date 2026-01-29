import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import tournamentRoutes from './tournamentRoutes.js';
import stepRoutes from './stepRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/step', stepRoutes);

export default router;
