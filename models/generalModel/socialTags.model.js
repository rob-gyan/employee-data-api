module.exports = (sequelize, Sequelize) => {
  const SocialTag = sequelize.define("socialtags", {
    tags: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
  });

  return SocialTag;
};
