export const { NODE_ENV } = process.env;

export const ENVIRONMENT = NODE_ENV || 'development';

export const getEnvVariable = (key: string) => {
  let prefix;

  switch (ENVIRONMENT) {
    case 'development':
      prefix = 'DB';
      break;
    case 'test':
      prefix = 'TESTING_DB';
      break;
    case 'production':
      prefix = 'STAGING_DB';
      break;
    default:
      prefix = 'DB';
  }

  const prefixedKey = `${prefix}_${key}`.toUpperCase();
  return process.env[prefixedKey];
};

const DATABASE_HOST = getEnvVariable('HOST');
const DATABASE_NAME = getEnvVariable('NAME');
const DATABASE_USERNAME = getEnvVariable('USERNAME');
const DATABASE_PASSWORD = getEnvVariable('PASSWORD');
const DATABASE_PORT = Number(getEnvVariable('PORT'));

export {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
};
