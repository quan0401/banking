import { consoleLogger } from '@quan0401/ecommerce-shared';
import { Logger } from 'winston';
import { Sequelize } from 'sequelize';
import { config } from '~/config';

const log: Logger = consoleLogger('database', 'debug');

export const sequelize = new Sequelize(config.MYSQL_DB!, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
}); // Example for postgres

export const connectDatabae = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    log.info('Connect to database successfully!');
  } catch (error) {
    log.error('Error connect to database', error);
  }
};
