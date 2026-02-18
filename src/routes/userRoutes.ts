import { Router, Request, Response } from 'express';
import User from '../models/users';
//##########################################################################
const router = Router();


//##########################################################################
// GET Récupérer tous les utilisateurs
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
});
//##########################################################################
// POST Créer un utilisateur
router.post('/users', async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
});
//##########################################################################
// DELETE Supprimer un utilisateur par son ID
router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });

        if (deleted) {
            res.json({ message: `Utilisateur ${id} supprimé avec succès` });
        } else {
            res.status(404).json({ message: `Utilisateur ${id} introuvable` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
});
//##########################################################################
export default router;