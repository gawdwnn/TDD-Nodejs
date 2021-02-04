import express from 'express';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import UserService from '../user/UserService.js';
import AuthenticationException from './AuthenticationException.js';
import ForbiddenException from './ForbiddenException.js';

const router = express.Router();

router.post('/api/1.0/auth', check('email').isEmail(), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AuthenticationException());
  }

  const { email, password } = req.body;
  const user = await UserService.findByEmail(email);
  if (!user) {
    return next(new AuthenticationException());
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new AuthenticationException());
  }
  if (user.inactive) {
    return next(new ForbiddenException());
  }
  res.send({
    id: user.id,
    username: user.username,
  });
});

export default router;
