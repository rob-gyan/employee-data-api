module.exports = (sequelize, Sequelize) => {
  const Website = sequelize.define("websites", {
    topicWebsite: {
      type: Sequelize.TEXT,
    },
  });
  return Website;
};
