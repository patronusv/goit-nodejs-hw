const User = require('./schemas/userSchema');

const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

const findUserById = async id => {
  const user = await User.findById(id);
  return user;
};

const createNewUser = async ({ email, password, subscription, token }) => {
  const user = await new User({ email, password, subscription, token }).save();
  return user;
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createNewUser,
  updateToken,
};
