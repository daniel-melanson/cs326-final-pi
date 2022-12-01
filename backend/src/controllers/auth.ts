import bcrypt from 'bcryptjs';
import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import type { VerifyFunction } from 'passport-local';
import prisma from '../db/index.js';

export function checkIsAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return next();
  }
  res.status(403).json({ message: 'unauthorized' });
}

export function passportLoginCallback(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user);
    if (err) {
      res.status(500).send(err);
    } else if (user) {
      req.logIn(user, (err) => {
        if (err) {
          res.status(401).json({ errors: ['Bad'] });
        } else {
          delete user.hash;

          res.status(200).json({ message: 'Login Success', user });
        }
      });
    } else {
      res.status(400).json({ errors: ['Invalid email or password.'] });
    }
  })(req, res, next);
}

export const authUser: VerifyFunction = async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && bcrypt.compareSync(password, user.hash)) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export function logout(req: Request, res: Response): void {
  req.logout({ keepSessionInfo: false }, () => undefined);

  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout Successful!' });
  });
}
