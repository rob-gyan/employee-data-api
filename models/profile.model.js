module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profiles", {
    profile: {
      type: Sequelize.TEXT,
    },
  });

  return Profile;
};
