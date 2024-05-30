import { Request, Response } from 'express';
import fs from 'fs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface ExtendedErrorOptions {
  messageLog: string;
  code?: number;
  messageJson?: string | null;
}

const checkEnvVariables = (): void => {
  if (fs.existsSync('.env')) {
    if (!process.env.PASSWORD_PG) console.error('PASSWORD_PG empty');
    if (!process.env.PORT_PG) console.error('PORT_PG empty');
    if (!process.env.DATABASE_PG) console.error('DATABASE_PG empty');
    if (!process.env.USER_NAME_PG) console.error('USER_NAME_PG empty');
  } else {
    console.error('.env missing');
  }
};

const runInitialSettings = (): void => {
  checkEnvVariables();
};

const log = {
  serverSuccess: (rest: string): void => {
    console.log(rest);
  },
  serverError: (rest: string, err?: Error): void => {
    if (err) {
      let address: string | undefined;
      const stack = err.stack;
      const fileAndLineMatch = stack?.match(/.*[\\\/]([^\\\/]+)[\\\/]([^\\\/]+\.js):(\d+):\d+/);
      const nodeModulesMatch = stack?.match(/.*[\\\/](node_modules[\\\/].*?):(\d+):\d+/);

      if (fileAndLineMatch) {
        const [, folderName, fileName] = fileAndLineMatch;
        address = `\\${folderName}\\${fileName}`;
      }

      if (stack?.includes('node_modules') && nodeModulesMatch) {
        address = `${nodeModulesMatch[1]}:${nodeModulesMatch[2]}`;
      }

      const lineMatch = stack?.match(/.*:(\d+):\d+/);
      const line = lineMatch ? lineMatch[1] : 'N/A';

      console.error({
        CustomMessage: rest,
        Address: address ?? 'N/A',
        Line: line,
        Name: err.name,
        ErrorMessage: err.message,
        'Error Object': err,
      });
    } else {
      console.error(rest);
    }
  },
  logWithTimestamp: (level: string, rest: string): void => {
    const timestamp = dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss');
    const capitalizeFirstLetter = (string: string): string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    console.log(`${capitalizeFirstLetter(level)}: ${timestamp}:`, rest);
  },
  success: (rest: string): void => {
    log.logWithTimestamp('success', rest);
  },
  debug: (rest: string): void => {
    log.logWithTimestamp('debug', rest);
  },
  info: (rest: string): void => {
    log.logWithTimestamp('info', rest);
  },
  warn: (rest: string): void => {
    log.logWithTimestamp('warn', rest);
  },
  error: (rest: string): void => {
    log.logWithTimestamp('error', rest);
  },
  show: (rest: string): void => {
    console.log(rest);
  },
};

class ExtendedError extends Error {
  code: number;
  messageJson: string | null;

  constructor({ messageLog = 'Unknown error occurred.', code = 500, messageJson = null }: ExtendedErrorOptions) {
    if (typeof messageLog !== 'string') {
      throw new TypeError('messageLog must be a string.');
    }
    if (code < 400 || code >= 600) {
      throw new RangeError('code must be in the range 400-599.');
    }
    super(messageLog);
    this.name = 'ExtendedError';
    this.code = code;
    this.messageJson = messageJson;
  }

  toJSON(): { name: string; message: string; code: number; messageJson?: string | null } {
    const jsonError = {
      name: this.name,
      message: this.message,
      code: this.code,
      messageJson: this.messageJson,
    };
    return jsonError;
  }
}
export { log, ExtendedError, runInitialSettings };
