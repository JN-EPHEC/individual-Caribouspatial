import type { Request, Response } from "express";
import User from "../models/users";


// GET de tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};
// POST de tous les utilisateurs
export const postUser = async (req: Request, res: Response) => {
        try {
            const { nom, prenom } = req.body;
            const newUser = await User.create({ nom, prenom });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
        }
}
// DELETE d'un utilisateur selon son id
export const deleteUser = async (req: Request, res: Response) => {
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
}