import express from 'express';
import { UsersController } from '../controllers/userControllers';
import validation from '../middlewares/validation';

const router = express.Router();

const { signUp, login } = UsersController;


router.post('/signup', validation.auth, signUp);
router.post('/login', validation.auth, login);


export default router;
