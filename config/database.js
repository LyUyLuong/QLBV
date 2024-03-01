const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        logging: false // Disable logging
    }
);

sequelize.authenticate().then(() => {
    console.log('Connect successfully.');
}).catch((error) => {
    console.error('Connect Error: ', error);
});

module.exports = sequelize;