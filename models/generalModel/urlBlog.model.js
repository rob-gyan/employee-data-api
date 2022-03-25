module.exports = (sequelize, Sequelize) => {
  const UrlBlog = sequelize.define("urlblogs", {
    urlBlog: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
  });

  return UrlBlog;
};
