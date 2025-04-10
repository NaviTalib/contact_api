import express from 'express';
import { register,login } from '../Controllers/user.js';

const router = express.Router();

// user register route
// @api dsc : -> register user
// @api endPoint : -> /api/user/register
// @api method : -> POST

router.post('/register',register);


// user login route
// @api dsc : -> login user
// @api endPoint : -> /api/user/login
// @api method : -> POST

router.post('/login',login);

export default router;

