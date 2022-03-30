module.exports = (sequelize, Sequelize) => {
  const SocialBook = sequelize.define("socialbooks", {
    urlBlog: {
      type: Sequelize.TEXT,
    },
    tags: {
      type: Sequelize.TEXT,
    },
    liveLinks: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    assignee: {
      type: Sequelize.TEXT,
    },
    startDate: {
      type: Sequelize.TEXT,
    },
    dueDate: {
      type: Sequelize.TEXT,
    },
    timeEstimation: {
      type: Sequelize.TIME,
    },
    status: {
      type: Sequelize.TEXT,
    },
    taskType: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    projectName: {
      type: Sequelize.TEXT,
    },
    time: {
      type: Sequelize.TEXT,
    },
  });

  return SocialBook;
};
