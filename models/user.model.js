module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    user: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.TEXT,
    },
    role: {
      type: Sequelize.TEXT,
    },
    twoFA: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    verifyTwoFA: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
