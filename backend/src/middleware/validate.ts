import type express from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export default function validate(validations: ValidationChain[]) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}
