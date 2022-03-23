module.exports = (sequelize, Sequelize) => {
  const BlogImage = sequelize.define("blogimages", {
    imageSize: {
      type: Sequelize.TEXT,
    },
    imageAdditionalImage: {
      type: Sequelize.TEXT,
    },
    imageAssignee: {
      type: Sequelize.TEXT,
    },
    imageImage: {
      type: Sequelize.TEXT,
    },
    imageStartDate: {
      type: Sequelize.TEXT,
    },
    imageDueDate: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    imageStatus: {
      type: Sequelize.TEXT,
    },
    imageTimeEstimation: {
      type: Sequelize.TEXT,
    },
    imageTime: {
      type: Sequelize.TEXT,
    },
  });
  return BlogImage;
};
