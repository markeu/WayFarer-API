import express from 'express';
import { UsersController } from '../controllers/userControllers';
import TripsController from '../controllers/tripControllers';
import validation from '../middlewares/validation';

const router = express.Router();

const { signUp, login } = UsersController;
const { createTrip } = TripsController;

router.post('/signup', validation.auth, signUp);
router.post('/login', validation.auth, login);
router.post('/trip', validation.tripValidator, createTrip);


export default router;
