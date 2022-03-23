module.exports = (sequelize, Sequelize) => {
  const Type = sequelize.define("types", {
    type: {
      type: Sequelize.TEXT,
    },
  });
  return Type;
};
