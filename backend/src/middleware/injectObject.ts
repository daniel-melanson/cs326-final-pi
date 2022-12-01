import type { RequestHandler } from 'express';
import prisma, { TableNames } from '../db/index.js';

export function injectObject(type: TableNames, include: any): RequestHandler {
  return async (req, res, next) => {
    try {
      req[type] = await (prisma as any)[type].findUnique({
        where: {
          id: req.id,
        },
        include,
      });

      if (req[type]) {
        next();
      } else {
        res.status(404).send('404 Not Found');
      }
    } catch (e) {
      res.status(500).json({
        errors: [],
      });
      next(e);
    }
  };
}
