/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import validator from 'validator';
import User from '../models/user';

const router = Router();

/**
 * @method POST
 * @param username: String
 * @param email: String
 * @param password: String
 * @description Signup user
 */
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      throw new Error('All fields must be filled');
    if (!validator.isEmail(email)) throw new Error('Email is not valid');
    const user = await new User({
      username,
      email,
      password,
    }).save();
    await (user as any).generateAuthToken();
    res.status(201).json({
      message: 'User created',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'User could not created',
      error: err.message,
    });
  }
});

/**
 * @method POST
 * @param username: String
 * @param password: String
 * @description Login user
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) throw new Error('All fields must be filled');
    const user = await (User as any).findByCredentials(username, password);
    await (user as any).generateAuthToken();
    res.status(201).json({
      message: 'User created',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'User could not created',
      error: err.message,
    });
  }
});

export default router;
