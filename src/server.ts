import express from 'express';
import path from 'path'; // import pour la génération de chemin
import userRoutes from './routes/userRoutes'; //import du fichier Typescript des routes
import sequelize from './config/database'; // import de la DB
import './models/users'; // import du modèle Users
import {requestLogger} from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler"; // import de l'afficheur personalisé d'erreur
//##########################################################################
const app = express();
const port = 3000;
app.use(express.json()); //parse le json
//Rend le dossier "public" statique, rend les fichiers de ce dernier accessible au navigateur
app.use(express.static(path.join(__dirname, '../public')));
const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" }
];
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');
        await sequelize.sync();
        console.log('Base de données synchronisée.');
        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
        process.exit(1);
    }
};

//##########################################################################
// Interface en TypeScript pour typer les étudiants
interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}

//##########################################################################
//API root (ignoré si index.html existe dans /public)
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur API");
});

//API tableau étudinat dans /api/data
app.get("/api/data", (req, res) => {
   res.json(etudiants);
});

//API qui renvoit le nom dans l'URL et l'instant à la millisecond
app.get("/api/hello/:name", (req, res) => {
    const { name } = req.params;
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    });
});

//##########################################################################
app.use(requestLogger); // log chaque appel de fonction (doit être avant la déclaration des routes)
app.use('/api', userRoutes);
app.use(errorHandler);
//##########################################################################
function greet(name : string): string {
    return name
}

//##########################################################################
startServer();
console.log(greet("Hello world!"));