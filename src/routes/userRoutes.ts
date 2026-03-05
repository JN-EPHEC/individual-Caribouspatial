import { Router } from 'express';
import {deleteUser, getAllUsers, postUser} from "../controllers/userController";
//##########################################################################
const router = Router();
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Récupère la liste des utilisateurs
 *      tags: [Users, GET]
 *      responses:
 *          200:
 *              description: Succès
 */
router.get('/users', getAllUsers);
/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Envoi l'utilisateur que l'on veut ajouter à la DB
 *      tags: [Users, POST]
 *      responses:
 *          200:
 *              description: Succès
 */
router.post('/users', postUser);
/**
 * @swagger
 * /api/users:
 *  delete:
 *      summary: Suppression d'un utilisateur par son id
 *      tags: [Users, DELETE]
 *      responses:
 *          200:
 *              description: Succès
 */
router.delete('/users/:id', deleteUser);    // DELETE Supprimer un utilisateur par son ID
//##########################################################################
export default router;