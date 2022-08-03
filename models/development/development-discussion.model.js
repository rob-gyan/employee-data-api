module.exports = (sequelize, Sequelize) => {
  const DevelopmentDiscussion = sequelize.define("developmentdiscussions", {
    message: {
      type: Sequelize.TEXT,
    },
    imageUrl: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    userEmailId: {
      type: Sequelize.TEXT,
    },
    taskType: {
      type: Sequelize.TEXT,
    },
    taskTypeId: {
      type: Sequelize.TEXT,
    },
    seoAuditQuestion: {
      type: Sequelize.TEXT,
    },
  });

  return DevelopmentDiscussion;
};
