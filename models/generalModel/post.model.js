module.exports = (sequelize, Sequelize) => {
  const GeneralPost = sequelize.define("generalposts", {
    post: {
      type: Sequelize.TEXT,
    },
  });
  return GeneralPost;
};
