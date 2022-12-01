import bcrypt from 'bcryptjs';
import express from 'express';
import { body } from 'express-validator';
import { checkIsAuthenticated, logout, passportLoginCallback } from '../controllers/auth.js';
import prisma from '../db/index.js';
import validate from '../middleware/validate.js';

const auth = express.Router();

auth.get('/', checkIsAuthenticated);

auth.post('/', passportLoginCallback);

auth.post('/logout', logout);

auth.post(
  '/signup',
  validate([
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('password').isStrongPassword(),
  ]),
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          hash,
        },
      });

      res.redirect('/login');
    } catch (e) {
      res.status(500).end();
    }
  },
);

export default auth;
