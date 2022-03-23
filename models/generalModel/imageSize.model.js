module.exports = (sequelize, Sequelize) => {
  const ImageSize = sequelize.define("imagesizes", {
    imageSize: {
      type: Sequelize.TEXT,
    },
  });
  return ImageSize;
};
