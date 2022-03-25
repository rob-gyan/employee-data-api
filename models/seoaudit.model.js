module.exports = (sequelize, Sequelize) => {
  const SeoAudit = sequelize.define("seoaudits", {
    seoAuditTableId: {
      type: Sequelize.TEXT,
    },
    grading: {
      type: Sequelize.TEXT,
    },
    assign: {
      type: Sequelize.TEXT,
    },
    reassign: {
      type: Sequelize.TEXT,
    },
    date: {
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
    projectId: {
      type: Sequelize.TEXT,
    },
    taskType: {
      type: Sequelize.TEXT,
    },
    amount: {
      type: Sequelize.TEXT,
    },
    topKey: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    note: {
      type: Sequelize.TEXT,
    },
    startDate: {
      type: Sequelize.TEXT,
    },
    dueDate: {
      type: Sequelize.TEXT,
    },
  });

  return SeoAudit;
};