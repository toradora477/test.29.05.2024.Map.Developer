import { Request, Response, NextFunction } from 'express';
import { ExtendedError } from '../tools';

const handlersError = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    const { message, stack, messageJson, code = 500 } = err;

    console.log({ message, stack });
    res.status(code).json({ status: false, errMessage: messageJson ?? message });
  } else {
    next();
  }
};

export default handlersError;
