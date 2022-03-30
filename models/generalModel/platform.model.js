module.exports = (sequelize, Sequelize) => {
  const Plateform = sequelize.define("plateforms", {
    postContentPlateform: {
      type: Sequelize.TEXT,
    },
  });
  return Plateform;
};
