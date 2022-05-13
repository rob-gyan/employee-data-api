let db = require("../../models");
const seoAudit = require("../project/seoAudit/alltable");

const Project = db.projects;
const SeoAudit = db.seoaudits;
const SocialMediaTable = db.socialmediatables;
const Discussion = db.discussions;
const Blog = db.blogs;
const SocialMedia = db.socialmediatables;
const Fourm = db.fourms;
const Backlink = db.backlinks;
const SocialBook = db.socialbooks;
const Keyword = db.keywords;
const Category = db.categories;
const Profile = db.profiles;
const Type = db.types;
const Url = db.urls;
const Website = db.websites;
const ImageSize = db.imageSizes;
const Upload = db.uploads;
const SocialTag = db.socialtags;
const UrlBlog = db.urlblogs;
const Plateform = db.plateforms;
const Media = db.medias;
const Post = db.posts;
const AdditionalImage = db.additionalimages;

// blog all table
const BlogTopic = db.blogtopics;
const BlogImage = db.blogimages;
const BlogUpload = db.bloguploads;
// social media all table
const SocialMediaContent = db.socialmediapostcontents;
const SocialMediaPost = db.socialmediaposts;
const SocialMedias = db.socialmedias;

// **********project create api controller**********
exports.projectCreate = async (req) => {
  try {
    let { projectName, description, clientCompany, status } = req.body;

    // for (ele of seoAudit) {
    //   const create = await SeoAudit.create({
    //     projectId: 1,
    //     checkQuestion: ele.checkQuestion,
    //     tool: ele.tool,
    //   });
    //   console.log(create);
    // }
    // return;

    // create project
    var createProject = await Project.create({
      projectName,
      description,
      clientCompany,
      status: "ACTIVE",
      projectCreater: req.user,
      createrRole: req.role,
    });

    for (ele of seoAudit) {
      await SeoAudit.create({
        tableCategory: ele.tableCategory,
        tableSubCategory: ele.tableSubCategory,
        checkQuestion: ele.checkQuestion,
        tool: ele.tool,
        projectId: createProject.id,
      });
    }

    return {
      data: createProject,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********project update api controller**********
exports.projectUpdate = async (req) => {
  try {
    let { projectName, description, clientCompany, status, projectId } =
      req.body;

    // find project
    let project = await Project.findOne({
      where: { id: projectId },
    });

    // if project doesn't exist
    if (project == null) {
      return {
        data: null,
        error: "project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update project
    var updateProject = await project.update({
      projectName,
      description,
      clientCompany,
      status,
    });

    return {
      data: updateProject,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********project update status api controller**********
exports.projectUpdateStatus = async (req) => {
  try {
    let { status, projectId } = req.body;

    // find project
    let project = await Project.findOne({
      where: { id: projectId },
    });

    // if project doesn't exist
    if (project == null) {
      return {
        data: null,
        error: "project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update project
    var updateProject = await project.update({
      status,
    });

    return {
      data: updateProject,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all project api controller**********
exports.getAllProject = async (req) => {
  try {
    // find all project
    let allProject = await Project.findAll();

    let allProjects = [];
    for (const element of allProject) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      // console.log(today);
      // all completed task count
      let allBacklinkComplete = await Backlink.count({
        where: { status: "PROCESSING", projectId: element.id, dueDate: today },
      });
      let allBlogTopicComplete = await BlogTopic.count({
        where: {
          topicStatus: "PROCESSING",
          projectId: element.id,
          topicDueDate: today,
        },
      });
      let allBlogImageComplete = await BlogImage.count({
        where: {
          imageStatus: "PROCESSING",
          projectId: element.id,
          imageDueDate: today,
        },
      });
      let allBlogUploadComplete = await BlogUpload.count({
        where: {
          uploadStatus: "PROCESSING",
          projectId: element.id,
          uploadDueDate: today,
        },
      });
      let allPostContentCount = await SocialMediaContent.count({
        where: {
          postContentStatus: "PROCESSING",
          projectId: element.id,
          postContentDueDate: today,
        },
      });
      let allMediaCount = await SocialMedias.count({
        where: {
          mediaStatus: "PROCESSING",
          projectId: element.id,
          mediaDueDate: today,
        },
      });
      let allMediaPostCount = await SocialMediaPost.count({
        where: {
          postStatus: "PROCESSING",
          projectId: element.id,
          postDueDate: today,
        },
      });
      let allFourmComplete = await Fourm.count({
        where: { status: "PROCESSING", projectId: element.id, dueDate: today },
      });
      let allSocialBookComplete = await SocialBook.count({
        where: { status: "PROCESSING", projectId: element.id, dueDate: today },
      });

      // all uncompleted task count
      let allBacklinkUnComplete = await Backlink.count({
        where: { status: "DELAY", projectId: element.id },
      });
      let allBlogTopicUnComplete = await BlogTopic.count({
        where: { topicStatus: "DELAY", projectId: element.id },
      });
      let allBlogImageUnComplete = await BlogImage.count({
        where: { imageStatus: "DELAY", projectId: element.id },
      });
      let allBlogUploadUnComplete = await BlogUpload.count({
        where: { uploadStatus: "DELAY", projectId: element.id },
      });
      let allSocialMediaUncomplete = await SocialMediaContent.count({
        where: { postContentStatus: "DELAY", projectId: element.id },
      });
      let allMediaUncomplete = await SocialMedias.count({
        where: {
          mediaStatus: "DELAY",
          projectId: element.id,
        },
      });
      let allMediaPostUncomplete = await SocialMediaPost.count({
        where: {
          postStatus: "DELAY",
          projectId: element.id,
        },
      });
      let allFourmUnComplete = await Fourm.count({
        where: { status: "DELAY", projectId: element.id },
      });
      let allSocialBookUnComplete = await SocialBook.count({
        where: { status: "DELAY", projectId: element.id },
      });
      // sum of completed task
      const totalCompleted =
        allBacklinkComplete +
        allBlogTopicComplete +
        allBlogImageComplete +
        allBlogUploadComplete +
        allFourmComplete +
        allPostContentCount +
        allMediaCount +
        allMediaPostCount +
        allSocialBookComplete;

      // sum of uncompleted task
      const totalUnCompleted =
        allBacklinkUnComplete +
        allBlogTopicUnComplete +
        allBlogImageUnComplete +
        allBlogUploadUnComplete +
        allFourmUnComplete +
        allMediaUncomplete +
        allSocialMediaUncomplete +
        allMediaPostUncomplete +
        allSocialBookUnComplete;

      allProjects.push({
        id: element.id,
        projectName: element.projectName,
        description: element.description,
        clientCompany: element.clientCompany,
        projectCreater: element.projectCreater,
        status: element.status,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        completedTaskCount: totalCompleted,
        uncompletedTaskCount: totalUnCompleted,
      });
    }

    return {
      data: allProjects,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all project by id api controller**********
exports.getProjectById = async (req) => {
  try {
    const { projectId } = req.body;
    // find  project by id
    let findProjectById = await Project.findOne({ where: { id: projectId } });

    return {
      data: findProjectById,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all project task api controller**********
exports.getAllProjectTask = async (req) => {
  try {
    // find all backlinks
    let allBacklink = await Backlink.findAll();
    let allBlog = await Blog.findAll();
    let allFourm = await Fourm.findAll();
    let allSocialBook = await SocialBook.findAll();

    let allProjectTask = [];
    allBacklink.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allBlog.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allFourm.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });

    allSocialBook.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    const newArray = [];
    for (ele of allProjectTask) {
      let allProject = await Project.findAll({ where: { id: ele.projectId } });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          taskType: ele.taskType,
          projectId: ele.projectId,
          projectName: ele.projectName,
          assignee: ele.assignee,
          dueDate: ele.dueDate,
          status: ele.status,
          createdAt: data.createdAt,
          projectCreater: data.projectCreater,
        });
      }

      // console.log(allProject);
    }

    return {
      data: newArray,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId api controller**********
exports.getAllProjectTaskById = async (req) => {
  try {
    const { projectId } = req.body;

    // find all task on the basis of projectId
    let allBacklink = await Backlink.findAll({ where: { projectId } });
    let allBlog = await Blog.findAll({ where: { projectId } });
    let allFourm = await Fourm.findAll({ where: { projectId } });
    let allSocialBook = await SocialBook.findAll({ where: { projectId } });
    let allSocialMedia = await SocialMedia.findAll({ where: { projectId } });

    let allProjectTaskById = [];
    allBacklink.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        assignee: i.dataValues.assignee,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allBlog.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allFourm.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });

    allSocialBook.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });

    allSocialMedia.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });

    return {
      data: allProjectTaskById,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get task on the basis of projectId,backlinkId and taskType **********
exports.getHomeTask = async (req) => {
  const { id, projectId, taskType } = req.body;
  try {
    // find Backlink
    let allBacklink = await Backlink.findOne({
      where: { id, projectId, taskType },
    });

    // find Blog
    let allBlog = await Blog.findOne({
      where: { id, projectId, taskType },
    });

    // find SocialBook
    let allSocialBook = await SocialBook.findOne({
      where: { id, projectId, taskType },
    });

    // find Fourm
    let allFourm = await Fourm.findOne({
      where: { id, projectId, taskType },
    });

    // find Social media
    let allSocialMedia = await SocialMedia.findOne({
      where: { id, projectId, taskType },
    });

    const data =
      allBacklink || allBlog || allSocialBook || allFourm || allSocialMedia;
    if (data == null) {
      return {
        data: null,
        error: "Something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: data,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete project api by id controller**********
exports.deleteProject = async (req) => {
  try {
    let { projectId } = req.body;
    let deleteProject = await Project.destroy({
      where: { id: projectId },
    });

    // if project doesn't exist
    if (deleteProject == 0) {
      return {
        data: null,
        error: "project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    await Backlink.destroy({
      where: { projectId },
    });

    // delete blog
    let findBlog = await Blog.findOne({ where: { projectId } });
    let findSocialMedia = await SocialMediaTable.findOne({
      where: { projectId },
    });
    console.log(findBlog);
    if (findBlog === null) {
      // delete fourm
      await Fourm.destroy({
        where: { projectId },
      });

      // delete seo audit
      await SeoAudit.destroy({
        where: { projectId },
      });

      // delete social book
      await SocialBook.destroy({
        where: { projectId },
      });

      // delete discussion
      let d = await Discussion.destroy({
        where: { projectId },
      });

      return {
        data: deleteProject,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (findSocialMedia === null) {
      // delete fourm
      await Fourm.destroy({
        where: { projectId },
      });

      // delete seo audit
      await SeoAudit.destroy({
        where: { projectId },
      });

      // delete social book
      await SocialBook.destroy({
        where: { projectId },
      });

      // delete discussion
      let d = await Discussion.destroy({
        where: { projectId },
      });

      return {
        data: deleteProject,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else {
      await Blog.destroy({
        where: { id: findBlog.dataValues.id },
      });
      await BlogTopic.destroy({
        where: { id: findBlog.dataValues.topicId },
      });
      await BlogImage.destroy({
        where: { id: findBlog.dataValues.imageSizeId },
      });
      await BlogUpload.destroy({
        where: { id: findBlog.dataValues.uploadId },
      });

      // delete fourm
      await Fourm.destroy({
        where: { projectId },
      });

      // delete seo audit
      await SeoAudit.destroy({
        where: { projectId },
      });

      // delete social book
      await SocialBook.destroy({
        where: { projectId },
      });

      // delete social media
      await SocialMediaTable.findOne({
        where: { projectId },
      });

      // delete discussion
      let deleteDiscussion = await Discussion.destroy({
        where: { projectId },
      });

      return {
        data: deleteProject,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// **********delete project api by id controller**********
exports.deleteKeyword = async (req) => {
  try {
    let { keywordId } = req.body;
    let deleteKeyword = await Keyword.destroy({
      where: { id: keywordId },
    });

    // if project doesn't exist
    if (deleteKeyword == 0) {
      return {
        data: null,
        error: "project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    return {
      data: deleteKeyword,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (err) {
    console.warn("something went wrong");
  }
};

// get all general fields
exports.getAllGeneralField = async (req) => {
  const { projectId } = req.body;
  try {
    var socialtags = await SocialTag.findAll({
      where: { projectId },
    });
    var allKeyword = await Keyword.findAll({ where: { projectId } });
    var allCategory = await Category.findAll();
    var allProfile = await Profile.findAll();
    var allType = await Type.findAll();
    var allUrl = await Url.findAll();
    var allWebsite = await Website.findAll();
    var allImageSize = await ImageSize.findAll();
    var allUpload = await Upload.findAll();
    var allUrlBlog = await UrlBlog.findAll({ where: { projectId } });
    var allSocialTag = await SocialTag.findAll({
      where: { projectId },
    });
    var allPlateform = await Plateform.findAll();
    var allPost = await Post.findAll();
    var allMedia = await Media.findAll();
    var allAdditionalImage = await AdditionalImage.findAll();

    return {
      data: {
        allSocialTags: socialtags,
        allKeyword: allKeyword,
        allCategory,
        allProfile,
        allType,
        allUrl,
        allWebsite,
        allImageSize,
        allUpload,
        allUrlBlog,
        allSocialTag,
        allPlateform,
        allPost,
        allMedia,
        allAdditionalImage,
      },
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
