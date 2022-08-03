module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {
    topicId: {
      type: Sequelize.TEXT,
    },
    fileRichText: {
      type: Sequelize.TEXT,
    },
    imageSizeId: {
      type: Sequelize.TEXT,
    },
    uploadId: {
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
    createdBy: {
      type: Sequelize.TEXT,
    },
  });

  return Blog;
};
