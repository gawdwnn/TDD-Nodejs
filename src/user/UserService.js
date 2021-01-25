import bcrypt from 'bcrypt';
import User from './User.js';

const save = async (body) => {
  const hash = await bcrypt.hash(body.password, 10);
  const user = { ...body, password: hash };
  await User.create(user);
};

export default { save };
