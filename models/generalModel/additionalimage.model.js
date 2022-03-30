module.exports = (sequelize, Sequelize) => {
  const AdditionalImage = sequelize.define("additionalImages", {
    mediaAdditionalImage: {
      type: Sequelize.TEXT,
    },
  });
  return AdditionalImage;
};
