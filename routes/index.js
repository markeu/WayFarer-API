import express from 'express';
import { UsersController } from '../controllers/userControllers';
import TripsController from '../controllers/tripControllers';
import BusesController from '../controllers/busController';
import validation from '../middlewares/validation';
import { verifyToken, isAdmin } from '../middlewares/authenticate';

const router = express.Router();

const { signUp, login } = UsersController;
const { createTrip, getAllTrips, updateTripStatus } = TripsController;
const { createBus, getAll } = BusesController;

router.post('/auth/signup', validation.auth, signUp);
router.post('/auth/login', validation.auth, login);
router.post('/trip', verifyToken, isAdmin, validation.tripValidator, createTrip);
router.get('/trip', verifyToken, getAllTrips);
router.patch('/:id/trip', verifyToken, isAdmin, updateTripStatus);
router.post('/bus', verifyToken, isAdmin, validation.busValidator, createBus);
router.get('/bus', verifyToken, isAdmin, getAll);


export default router;
