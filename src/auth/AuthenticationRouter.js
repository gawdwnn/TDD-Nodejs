import express from 'express';
import UserService from '../user/UserService';

const router = express.Router();

router.post('/api/1.0/auth', async (req, res) => {
  const { email } = req.body;
  const user = await UserService.findByEmail(email);
  res.send({
    id: user.id,
    username: user.username,
  });
});

export default router;
