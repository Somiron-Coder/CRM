import { Router } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { auth, authorize } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      password,
      name,
      role: role || 'employee',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in' });
  }
});

// Get current user
router.get('/me', auth, (req: AuthRequest, res) => {
  res.json(req.user);
});

// Update user
router.put('/me', auth, async (req: AuthRequest, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Please authenticate' });
    }

    updates.forEach((update) => {
      if (req.user) {
        (req.user as any)[update] = req.body[update];
      }
    });

    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

export default router;