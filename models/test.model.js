module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("tests", {
    user: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    json: {
      type: Sequelize.JSON,
    },
  });
  return Test;
};
