module.exports = (sequelize, Sequelize) => {
  const SeoAuditQuestion = sequelize.define("seoauditquestions", {
    tableCategory: {
      type: Sequelize.TEXT,
    },
    tableSubCategory: {
      type: Sequelize.TEXT,
    },
    checkQuestion: {
      type: Sequelize.TEXT,
    },
    tool: {
      type: Sequelize.TEXT,
    },
  });
  return SeoAuditQuestion;
};
