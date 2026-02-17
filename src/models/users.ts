import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // import de la DB

// Interface décrivant tous les attributs du modèle
interface UserAttributes {
    id: number;
    nom: string;
    prenom: string;
}

// Les champs optionnels lors de la création (id est auto-généré)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// La classe étend Model en passant les deux interfaces comme génériques
class User extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number;
    declare nom: string;
    declare prenom: string;
}

// Initialisation du modèle
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,       // l'instance de connexion
        tableName: 'users',
        modelName: 'User',
    }
);

export default User;