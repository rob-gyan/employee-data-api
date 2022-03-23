module.exports = (sequelize, Sequelize) => {
  const Url = sequelize.define("urls", {
    url: {
      type: Sequelize.TEXT,
    },
  });
  return Url;
};
