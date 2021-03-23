const winston = require('winston');

const customFormat = winston.format.printf((args) => {
  const { timestamp, level, message } = args;

  return `${timestamp} | ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    customFormat,
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});

logger.add(new winston.transports.Console());

module.exports = logger;