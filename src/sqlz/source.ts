import { Sequelize } from "sequelize";

const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_CMP || 'localhost';

const source = new Sequelize(`mysql://${dbPass}:${dbUser}@${dbHost}:${dbPort}/${dbName}`);

export default source;