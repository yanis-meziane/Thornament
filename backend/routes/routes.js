import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import tournamentRoutes from './tournamentRoutes.js';
import stepRoutes from './stepRoutes.js';
import playerRoutes from './playerRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/step', stepRoutes);
router.use('/player', playerRoutes);

export default router;
