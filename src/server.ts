import express from 'express';
const app = express();
const port = 3000;

// Interface TypeScript pour typer les étudiants
interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}
const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" }
];
//API root
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur API");
});
//API tableau étudinat dans /api/data
app.get("/api/data", (req, res) => {
   res.json(etudiants);
});

app.listen(port, () => {
   console.log(`Serveur lancé sur http://localhost:${port}`);
});


function greet(name : string): string {
    return name
}

console.log(greet("Hello world!"));