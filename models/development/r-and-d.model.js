module.exports = (sequelize, Sequelize) => {
  const RDTask = sequelize.define("rdtask", {
    task: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.TEXT,
    },
    referenceLiveLinks: {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify(),
    },
    amount: {
      type: Sequelize.TEXT,
    },
    xdLink: {
      type: Sequelize.TEXT,
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
    note: {
      type: Sequelize.TEXT,
    },
    timeEstimation: {
      type: Sequelize.TEXT,
    },
    assignedBy: {
      type: Sequelize.TEXT,
    },
    createdBy: {
      type: Sequelize.TEXT,
    },
  });

  return RDTask;
};
