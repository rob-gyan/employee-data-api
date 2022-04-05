module.exports = (sequelize, Sequelize) => {
  const BlogUpload = sequelize.define("bloguploads", {
    upload: {
      type: Sequelize.TEXT,
    },
    uploadImageWithBlog: {
      type: Sequelize.TEXT,
    },
    uploadAssignee: {
      type: Sequelize.TEXT,
    },
    uploadStartDate: {
      type: Sequelize.TEXT,
    },
    uploadDueDate: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    uploadStatus: {
      type: Sequelize.TEXT,
    },
    uploadTimeEstimation: {
      type: Sequelize.TEXT,
    },
    uploadTime: {
      type: Sequelize.TEXT,
    },
  });

  return BlogUpload;
};
