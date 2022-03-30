module.exports = (sequelize, Sequelize) => {
  const GeneralMedia = sequelize.define("generalmedias", {
    media: {
      type: Sequelize.TEXT,
    },
  });
  return GeneralMedia;
};
