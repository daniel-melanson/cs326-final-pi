import bcrypt from 'bcryptjs';
import express from 'express';
import { body } from 'express-validator';
import passport from 'passport';
import { Strategy } from 'passport-local';
import prisma from '../db/index.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';
import validate from '../middleware/validate.js';

passport.use(
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && bcrypt.compareSync(password, user.hash)) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done) => {
  done(null, { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName });
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

const auth = express.Router();

auth.get('/', (req, res) => {
  if (req.isAuthenticated()) res.status(200).json(req.user);
  else res.status(401).send();
});

auth.post('/login', passport.authenticate('local', {
  successRedirect: '/campus',
  failureRedirect: '/login',
}));

auth.post('/logout', ensureLoggedIn, (req, res, next) => {
  req.logout({ keepSessionInfo: false }, (error) => {
    if (error) next(error);
    res.redirect('/');
  });
});

auth.post(
  '/signup',
  validate([
    body('firstName')
      .isString()
      .withMessage('First name must be a string')
      .isLength({ min: 2, max: 26 })
      .withMessage('First name should be between 2 and 26 characters'),
    body('lastName')
      .isString()
      .withMessage('Last name must be a string')
      .isLength({ min: 2, max: 26 })
      .withMessage('Last name should be between 2 and 26 characters'),
    body('email').isEmail().withMessage('Email should be a valid'),
    body('password')
      .isStrongPassword()
      .withMessage(
        'That password is not strong enough, try using a combination of uppercase and lowercase characters with symbols and numbers',
      ),
  ]),
  async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          hash,
        },
      });

      res.redirect('/login');
    } catch (e) {
      next(e);
    }
  },
);

export default auth;
