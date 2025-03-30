import express from 'express';
import { handleCreateUser, handleUserLogin } from '../controllers/users.controller.js';

const router = express.Router();

router.post("/", handleCreateUser);

router.post("/login", handleUserLogin);

export default router;