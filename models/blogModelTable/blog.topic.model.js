module.exports = (sequelize, Sequelize) => {
  const BlogTopic = sequelize.define("blogtopics", {
    topic: {
      type: Sequelize.TEXT,
    },
    topicWebsite: {
      type: Sequelize.TEXT,
    },
    topicAssignee: {
      type: Sequelize.TEXT,
    },
    topicStartDate: {
      type: Sequelize.TEXT,
    },
    topicDueDate: {
      type: Sequelize.TEXT,
    },
    projectId: {
      type: Sequelize.TEXT,
    },
    topicStatus: {
      type: Sequelize.TEXT,
    },
    topicTimeEstimation: {
      type: Sequelize.TEXT,
    },
    topicTime: {
      type: Sequelize.TEXT,
    },
  });

  return BlogTopic;
};
