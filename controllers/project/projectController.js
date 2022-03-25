let db = require("../../models");

const Project = db.projects;
const Blog = db.blogs;
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

// **********project create api controller**********
exports.projectCreate = async (req) => {
  try {
    let { projectName, description, clientCompany, status } = req.body;

    // // console.log(seoAudit);
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
      // all completed task count
      let allBacklinkComplete = await Backlink.count({
        where: { status: "COMPLETE", projectId: element.id },
      });
      let allBlogComplete = await Blog.count({
        where: { status: "COMPLETE", projectId: element.id },
      });
      let allFourmComplete = await Fourm.count({
        where: { status: "COMPLETE", projectId: element.id },
      });
      let allSocialBookComplete = await SocialBook.count({
        where: { status: "COMPLETE", projectId: element.id },
      });

      // all uncompleted task count
      let allBacklinkUnComplete = await Backlink.count({
        where: { status: "PROCESSING", projectId: element.id },
      });
      let allBlogUnComplete = await Blog.count({
        where: { status: "PROCESSING", projectId: element.id },
      });
      let allFourmUnComplete = await Fourm.count({
        where: { status: "PROCESSING", projectId: element.id },
      });
      let allSocialBookUnComplete = await SocialBook.count({
        where: { status: "PROCESSING", projectId: element.id },
      });
      // sum of completed task
      const totalCompleted =
        allBacklinkComplete +
        allBlogComplete +
        allFourmComplete +
        allSocialBookComplete;

      // sum of uncompleted task
      const totalUnCompleted =
        allBacklinkUnComplete +
        allBlogUnComplete +
        allFourmUnComplete +
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

    return {
      data: allProjectTask,
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

    const data = allBacklink || allBlog || allSocialBook || allFourm;
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

    return {
      data: deleteProject,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all keyword
exports.getAllKeyword = async (req) => {
  try {
    const { projectId } = req.body;
    var allKeyword = await Keyword.findAll({ where: { projectId } });
    return {
      data: allKeyword,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all category
exports.getAllCategory = async (req) => {
  try {
    var allCategory = await Category.findAll();
    return {
      data: allCategory,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all profile
exports.getAllProfile = async (req) => {
  try {
    var allProfile = await Profile.findAll();
    return {
      data: allProfile,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// get all type
exports.getAllType = async (req) => {
  try {
    var allType = await Type.findAll();
    return {
      data: allType,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// get all url
exports.getAllUrl = async (req) => {
  try {
    var allUrl = await Url.findAll();
    return {
      data: allUrl,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all website
exports.getAllWebsite = async (req) => {
  try {
    var allWebsite = await Website.findAll();
    return {
      data: allWebsite,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// get all imagesize
exports.getAllImageSize = async (req) => {
  try {
    var allImageSize = await ImageSize.findAll();
    return {
      data: allImageSize,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// get all upload
exports.getAllUpload = async (req) => {
  try {
    var allUpload = await Upload.findAll();
    return {
      data: allUpload,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all UrlBlog
exports.getAllUrlBlog = async (req) => {
  const { projectId } = req.body;
  try {
    var allUrlBlog = await UrlBlog.findAll({ where: { projectId } });

    return {
      data: allUrlBlog,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// get all social tags
exports.getAllSocialTag = async (req) => {
  const { projectId } = req.body;
  try {
    var allSocialTag = await SocialTag.findAll({
      where: { projectId },
    });

    return {
      data: allSocialTag,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all general fields
exports.getAllGeneralField = async (req) => {
  const { projectId } = req.body;
  try {
    var allGeneralField = await SocialTag.findAll({
      where: { projectId },
    });

    return {
      data: allGeneralField,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
