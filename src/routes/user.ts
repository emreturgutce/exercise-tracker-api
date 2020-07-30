/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import User from '../models/user';

const router = Router();

/**
 * @method GET
 * @description Get user
 */
router.get('/', async (req, res) => {
  try {
    if (!(req as any).user) throw new Error('User could not fetched');
    res.status(200).json({
      message: 'User fetched',
      data: {
        user: (req as any).user,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'User could not fetched',
      error: err.message,
    });
  }
});

/**
 * @todo add other field
 * @method PUT
 * @param username?: String
 * @param email?: String
 * @param password?: String
 * @description Update user by id
 */
router.put('/', async (req, res) => {
  const { _id } = (req as any).user;
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(_id);
    if (!user) {
      req.statusCode = 404;
      throw new Error('User not found by the given id');
    }
    if (username) (user as any).username = username;
    if (email) (user as any).email = email;
    if (password) (user as any).password = password;
    await (user as any).save();
    res.status(200).json({
      message: 'User updated',
      data: { user },
    });
  } catch (err) {
    res.status(req.statusCode ? req.statusCode : 400).json({
      message: 'User could not updated',
      error: err.message,
    });
  }
});

/**
 * @method DELETE
 * @param id: Number
 * @description Delete user by id
 */
router.delete('/', async (req, res) => {
  const { _id } = (req as any).user;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      req.statusCode = 404;
      throw new Error('User not found by the given id');
    }
    res.status(200).json({
      message: 'User deleted',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(req.statusCode ? req.statusCode : 500).json({
      message: 'User could not deleted',
      error: err.message,
    });
  }
});

export default router;
