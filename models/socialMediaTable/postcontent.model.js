module.exports = (sequelize, Sequelize) => {
  const SocialMediaPostContent = sequelize.define("socialmediapostcontents", {
    postContent: {
      type: Sequelize.TEXT,
    },
    postContentType: {
      type: Sequelize.TEXT,
    },
    postContentAssignee: {
      type: Sequelize.TEXT,
    },
    postContentPlateform: {
      type: Sequelize.TEXT,
    },
    postContentStartDate: {
      type: Sequelize.TEXT,
    },
    postContentDueDate: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    postContentStatus: {
      type: Sequelize.TEXT,
    },
    postContentTimeEstimation: {
      type: Sequelize.TEXT,
    },
    postContentTime: {
      type: Sequelize.TEXT,
    },
  });
  return SocialMediaPostContent;
};
