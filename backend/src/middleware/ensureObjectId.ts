import type { RequestHandler } from 'express';
import { param, validationResult } from 'express-validator';

const ID_VALIDATION = param('id').isInt().withMessage('The id must be an integer');

export const ensureObjectId: RequestHandler = (req, res, next) => {
  ID_VALIDATION.run(req);

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.id = Number(req.params['id']);
    return next();
  }

  res.status(400).json({ errors: errors.array() });
};
