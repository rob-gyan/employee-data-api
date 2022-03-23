module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    projectName: {
      type: Sequelize.TEXT,
    },
    description: {
      type: Sequelize.TEXT,
    },
    clientCompany: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.TEXT,
    },
    projectCreater: {
      type: Sequelize.TEXT,
    },
    createrRole: {
      type: Sequelize.TEXT,
    },
  });

  return Project;
};
