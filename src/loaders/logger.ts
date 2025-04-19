import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json({ space: 2 })
  ),
  transports: [
    new transports.File({ filename: 'logs/all.log' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Log to console during development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
