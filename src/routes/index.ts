/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import passport from '../config/passport';

const router = Router();

/**
 * @method POST
 * @param username: String
 * @param email: String
 * @param password: String
 * @description Signup user
 */
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  (req, res) => {
    res.status(201).json({
      message: 'User created',
      data: { user: req.user },
    });
  }
);

/**
 * @method POST
 * @param username: String
 * @param password: String
 * @description Login user
 */
router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  (req, res) => {
    res.status(200).json({
      message: 'Logged In',
      data: { user: req.user },
    });
  }
);

export default router;
