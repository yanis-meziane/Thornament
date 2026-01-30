import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import tournamentRoutes from './tournamentRoutes.js';
import stepRoutes from './stepRoutes.js';
import playerRoutes from './playerRoutes.js';
import stepComponentRoutes from './stepComponentRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/step', stepRoutes);
router.use('/player', playerRoutes);
router.use('/step-component', stepComponentRoutes);
router.use('/ai', aiRoutes);

export default router;
