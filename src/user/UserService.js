import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from './User.js';
import EmailService from '../email/EmailService.js';
import sequelize from '../../config/database.js';
import EmailException from '../email/EmailException.js';
import InvalidTokenException from './InvalidTokenException.js';

const generateToken = (length) => {
  return crypto.randomBytes(length).toString('hex').substring(0, length);
};

const save = async (body) => {
  const { username, email, password } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = { username, email, password: hash, activationToken: generateToken(16) };
  const transaction = await sequelize.transaction();
  await User.create(user, { transaction });
  try {
    await EmailService.sendAccountActivation(email, user.activationToken);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new EmailException();
  }
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};

const activate = async (token) => {
  const user = await User.findOne({ where: { activationToken: token } });
  if (!user) {
    throw new InvalidTokenException();
  }
  user.inactive = false;
  user.activationToken = null;
  await user.save();
};

const getUsers = async () => {
  const pageSize = 10;
  const usersWithCount = await User.findAndCountAll({
    where: { inactive: false },
    attributes: ['id', 'username', 'email'],
    limit: 10,
  });
  // const count = await User.count({ where: { inactive: false } });
  return {
    content: usersWithCount.rows,
    page: 0,
    size: 10,
    totalPages: Math.ceil(usersWithCount.count / pageSize),
  };
};

export default { save, findByEmail, activate, getUsers };
