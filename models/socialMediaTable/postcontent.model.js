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
      type: Sequelize.DATE,
    },
    postContentDueDate: {
      type: Sequelize.DATE,
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
