import app from './src/app.js';
import sequelize from './config/database.js';
import User from './src/user/User.js';
import bcrypt from 'bcrypt';

const addUsers = async (activeUserCount, inactiveUserCount = 0) => {
  const hash = await bcrypt.hash('P4ssword', 10);
  for (let i = 0; i < activeUserCount + inactiveUserCount; i++) {
    await User.create({
      username: `user${i + 1}`,
      email: `user${i + 1}@mail.com`,
      inactive: i >= activeUserCount,
      password: hash,
    });
  }
};

sequelize.sync({ force: true }).then(async () => {
  await addUsers(25);
});

app.listen(3000, console.log('app is running'));
