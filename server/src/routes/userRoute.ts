import express from 'express';
import { dashboard, login, registerAccount } from '../controllers/userController';
import { verifyUser } from '../middleware/auth'

const router = express.Router();

router.post('/register', registerAccount);
router.post('/login', login);
router.get('/dashboard', verifyUser, dashboard)

export default router;