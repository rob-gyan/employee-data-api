module.exports = (sequelize, Sequelize) => {
  const Discussion = sequelize.define("discussions", {
    message: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    userEmailId: {
      type: Sequelize.TEXT,
    },
    taskType: {
      type: Sequelize.TEXT,
    },
    taskTypeId: {
      type: Sequelize.TEXT,
    },
    seoAuditQuestion: {
      type: Sequelize.TEXT,
    },
  });

  return Discussion;
};
