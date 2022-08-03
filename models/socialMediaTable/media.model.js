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
      type: Sequelize.TEXT,
    },
    mediaDueDate: {
      type: Sequelize.TEXT,
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
    addImage: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    extraImage: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    mediaAssignedBy: {
      type: Sequelize.TEXT,
    },
  });
  return SocialMedia;
};
