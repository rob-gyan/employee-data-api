module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    category: {
      type: Sequelize.TEXT,
    },
  });

  return Category;
};
