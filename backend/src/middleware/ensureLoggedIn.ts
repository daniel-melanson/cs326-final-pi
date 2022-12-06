import type { NextFunction, Request, Response } from 'express';

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}
