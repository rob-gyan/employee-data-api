module.exports = (sequelize, Sequelize) => {
  const SocialMediaTable = sequelize.define("socialmediatables", {
    fileRichText: {
      type: Sequelize.TEXT,
    },
    postContentId: {
      type: Sequelize.TEXT,
    },
    mediaId: {
      type: Sequelize.TEXT,
    },
    postId: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    projectName: {
      type: Sequelize.TEXT,
    },
    taskType: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.TEXT,
    },
  });

  return SocialMediaTable;
};
