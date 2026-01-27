import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

let router = express.Router();

// Mount routes
// router.get('/test', test)
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;