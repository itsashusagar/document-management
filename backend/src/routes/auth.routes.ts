import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const token = await AuthService.register(email, password, name, role);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router;