module.exports = (sequelize, Sequelize) => {
  const SocialMediaPost = sequelize.define("socialmediaposts", {
    post: {
      type: Sequelize.TEXT,
    },
    postAssignee: {
      type: Sequelize.TEXT,
    },
    postSetTime: {
      type: Sequelize.TEXT,
    },
    postSetDate: {
      type: Sequelize.TEXT,
    },
    postStartDate: {
      type: Sequelize.DATE,
    },
    postDueDate: {
      type: Sequelize.DATE,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    postStatus: {
      type: Sequelize.TEXT,
    },
    postTimeEstimation: {
      type: Sequelize.TEXT,
    },
    postTime: {
      type: Sequelize.TEXT,
    },
  });
  return SocialMediaPost;
};
