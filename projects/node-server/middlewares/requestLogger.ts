import { Request, Response, NextFunction } from 'express';
import { log } from '../tools';
import dayjs from 'dayjs';
import { HTTP_METHODS } from '../common_constants/business';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = dayjs();

  res.on('finish', () => {
    const endTime = dayjs();
    const duration = (endTime.diff(startTime) / 1000).toFixed(3);
    const method = req.method;
    const url = method === HTTP_METHODS.GET?.toUpperCase() ? req.originalUrl.split('?')[0] : req.originalUrl;
    const status = res.statusCode;
    const statusCategory = Math.floor(status / 100).toString();

    const dataTransfer = {
      url,
      method,
      status,
      duration: `${duration} seconds`,
    };

    const logFunction =
      {
        4: log.warn,
        5: log.error,
      }[statusCategory] || log.info;

    logFunction(JSON.stringify(dataTransfer));
  });

  next();
};

export default requestLogger;
