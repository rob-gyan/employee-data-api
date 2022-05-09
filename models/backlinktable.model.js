module.exports = (sequelize, Sequelize) => {
  const Backlinktable = sequelize.define("backlinktable", {
    type: {
      type: Sequelize.TEXT,
    },
    category: {
      type: Sequelize.TEXT,
    },
    keywordGroup: {
      type: Sequelize.TEXT,
    },
    profile: {
      type: Sequelize.TEXT,
    },
    url: {
      type: Sequelize.TEXT,
    },
    extraKeyword: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    liveLinks: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    ourLinks: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    assignee: {
      type: Sequelize.TEXT,
    },
    amount: {
      type: Sequelize.TEXT,
    },
    startDate: {
      type: Sequelize.TEXT,
    },
    dueDate: {
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
    timeEstimation: {
      type: Sequelize.TEXT,
    },
    time: {
      type: Sequelize.TEXT,
    },
  });

  return Backlinktable;
};
