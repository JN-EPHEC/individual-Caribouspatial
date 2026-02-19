import { Router } from 'express';
import {deleteUser, getAllUsers, postUser} from "../controllers/userController";
//##########################################################################
const router = Router();
//##########################################################################
router.get('/users', getAllUsers);  // GET Récupérer tous les utilisateurs
router.post('/users', postUser);    // POST Créer un utilisateur
router.delete('/users/:id', deleteUser);    // DELETE Supprimer un utilisateur par son ID
//##########################################################################
export default router;