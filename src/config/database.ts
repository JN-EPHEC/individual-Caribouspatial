import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: './database.sqlite', // fichier créé automatiquement à la synchronisation
   logging: false,               // désactive les logs SQL dans la console
});
export default sequelize;