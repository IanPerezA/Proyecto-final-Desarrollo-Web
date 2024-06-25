// services/userService.js
const User = require('../models/User');

async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({
      where: {
        username: username,
        password: password
      }
    });
    if (!user) {
      return { status: 'no', tipousuario: null };
    }
    return { status: 'yes', tipousuario: user.tipousuario };
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    throw error;
  }
}

module.exports = {
  authenticateUser
};
