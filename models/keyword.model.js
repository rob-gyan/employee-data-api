module.exports = (sequelize, Sequelize) => {
  const Keyword = sequelize.define("keywords", {
    keyword: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
  });

  return Keyword;
};
