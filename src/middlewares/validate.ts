import express from 'express';
import { ContextRunner } from 'express-validator';

import { StatusCodes } from '../types';

export const validate = (validations: ContextRunner[]) => {
  // @ts-expect-error - This fix "Not all code paths return a value" error
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
      }
    }

    next();
  };
};
