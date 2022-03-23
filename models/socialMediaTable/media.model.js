module.exports = (sequelize, Sequelize) => {
  const SocialMedia = sequelize.define("socialmedias", {
    media: {
      type: Sequelize.TEXT,
    },
    mediaAdditionalImage: {
      type: Sequelize.TEXT,
    },
    mediaAssignee: {
      type: Sequelize.TEXT,
    },
    mediaImage: {
      type: Sequelize.TEXT,
    },
    mediaStartDate: {
      type: Sequelize.DATE,
    },
    mediaDueDate: {
      type: Sequelize.DATE,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    mediaStatus: {
      type: Sequelize.TEXT,
    },
    mediaTimeEstimation: {
      type: Sequelize.TEXT,
    },
    mediaTime: {
      type: Sequelize.TEXT,
    },
  });
  return SocialMedia;
};
