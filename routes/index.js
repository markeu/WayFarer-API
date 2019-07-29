import express from 'express';
import { UsersController } from '../controllers/userControllers';
import TripsController from '../controllers/tripControllers';
import validation from '../middlewares/validation';
import { verifyToken, isAdmin } from '../middlewares/authenticate';

const router = express.Router();

const { signUp, login } = UsersController;
const { createTrip, getAllTrips } = TripsController;

router.post('/auth/signup', validation.auth, signUp);
router.post('/auth/login', validation.auth, login);
router.post('/trip', verifyToken, isAdmin, validation.tripValidator, createTrip);
router.get('/trip', getAllTrips);


export default router;
