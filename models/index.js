const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: config.acquire,
    idle: config.idle,
  },
});

// check user authenticate or not
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);

// ******blog related table start*****
db.blogs = require("./blogs.model.js")(sequelize, Sequelize);
db.blogtopics = require("./blogModelTable/blog.topic.model.js")(
  sequelize,
  Sequelize
);
db.blogimages = require("./blogModelTable/blog.imagesize.model.js")(
  sequelize,
  Sequelize
);
db.bloguploads = require("./blogModelTable/blog.upload.model.js")(
  sequelize,
  Sequelize
);
// ******blog related table end*****

db.fourms = require("./fourm.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.keywords = require("./keyword.model.js")(sequelize, Sequelize);
db.profiles = require("./profile.model.js")(sequelize, Sequelize);
db.discussions = require("./discussion.model.js")(sequelize, Sequelize);
db.socialbooks = require("./socialBook.model.js")(sequelize, Sequelize);
db.backlinks = require("./backlinktable.model.js")(sequelize, Sequelize);
db.seoaudits = require("./seoaudit.model.js")(sequelize, Sequelize);
db.seoaudittopkeywords = require("./seoAuditTopTenKey.model.js")(
  sequelize,
  Sequelize
);
db.seoaudittables = require("./seoAuditQuestion.model.js")(
  sequelize,
  Sequelize
);
db.types = require("./generalModel/type.model.js")(sequelize, Sequelize);
db.urls = require("./generalModel/url.model.js")(sequelize, Sequelize);
db.websites = require("./generalModel/website.model.js")(sequelize, Sequelize);
db.imageSizes = require("./generalModel/imageSize.model.js")(
  sequelize,
  Sequelize
);
db.uploads = require("./generalModel/upload.model.js")(sequelize, Sequelize);
db.urlblogs = require("./generalModel/urlBlog.model.js")(sequelize, Sequelize);
db.socialtags = require("./generalModel/socialTags.model.js")(
  sequelize,
  Sequelize
);
db.plateforms = require("./generalModel/platform.model.js")(
  sequelize,
  Sequelize
);
db.medias = require("./generalModel/media.model.js")(sequelize, Sequelize);
db.posts = require("./generalModel/post.model.js")(sequelize, Sequelize);
db.additionalimages = require("./generalModel/additionalimage.model.js")(
  sequelize,
  Sequelize
);
db.tests = require("./test.model.js")(sequelize, Sequelize);

// ******socialmedia related table start*****
db.socialmediatables = require("./socialMedia.model")(sequelize, Sequelize);
db.socialmediapostcontents = require("./socialMediaTable/postcontent.model.js")(
  sequelize,
  Sequelize
);
db.socialmedias = require("./socialMediaTable/media.model.js")(
  sequelize,
  Sequelize
);
db.socialmediaposts = require("./socialMediaTable/post.model.js")(
  sequelize,
  Sequelize
);
// ******socialmedia related table end*****

// development all model
db.designs = require("./development/design.model.js")(sequelize, Sequelize);
db.developments = require("./development/development.model.js")(
  sequelize,
  Sequelize
);
db.rdtasks = require("./development/r-and-d.model.js")(sequelize, Sequelize);
db.testings = require("./development/testing.model.js")(sequelize, Sequelize);
db.developmentdiscussions =
  require("./development/development-discussion.model.js")(
    sequelize,
    Sequelize
  );
db.developmentproject = require("./development/development-project.model.js")(
  sequelize,
  Sequelize
);

// create table if not exist in our database
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synchronize all table!!");
  })
  .catch(function () {
    console.log("Synchronize Rejected");
  });

module.exports = db;
