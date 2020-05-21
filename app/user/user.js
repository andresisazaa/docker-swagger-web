const userModel = require('./userModel')

const getUsers = async () => {
  const users = await userModel.find({}).exec();
  return users
}

const getUserById = async (userId) => {
  const user = await userModel.findById(userId).exec();
  return user;
};

const createUser = async (body) => {
  const userData = { ...body };
  const user = await userModel.create(userData);
  return user;
}

const updateUser = async (id, body) => {
  const newData = { ...body };
  const updatedUser = await userModel.findByIdAndUpdate(id, newData, { new: true }).exec();
  return updatedUser;
}


const deleteUser = async (id) => {
  const deletedUser = await userModel.findByIdAndRemove(id).exec();
  const deletedUserId = deletedUser['_id'];
  return deletedUserId;
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
