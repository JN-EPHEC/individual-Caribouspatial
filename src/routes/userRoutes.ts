import { Router } from 'express';

//##########################################################################
const router = Router();
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

//##########################################################################
//API GET /api/users
router.get('/users', (req, res) => {
    res.json(users);
});

//##########################################################################
export default router;