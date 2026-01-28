import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

let router = express.Router();

// Mount routes
// router.get('/test', test)
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;