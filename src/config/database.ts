import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize('database', 'username', 'password', {
   host: 'localhost',
   dialect: 'postgres'//mysql , sqlite, etc
});