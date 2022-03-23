module.exports = (sequelize, Sequelize) => {
  const Upload = sequelize.define("uploads", {
    upload: {
      type: Sequelize.TEXT,
    },
  });
  return Upload;
};
