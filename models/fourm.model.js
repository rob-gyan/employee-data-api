module.exports = (sequelize, Sequelize) => {
  const Fourm = sequelize.define("fourms", {
    fourms: {
      type: Sequelize.TEXT,
    },
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
    status: {
      type: Sequelize.TEXT,
    },
    estimateTime: {
      type: Sequelize.TEXT,
    },
    amount: {
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
    time: {
      type: Sequelize.TEXT,
    },
    extraKeyword: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
  });
  return Fourm;
};
