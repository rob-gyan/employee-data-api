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
        isEdit: "0",
        projectName,
        taskType: "SEOAUDIT",
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
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
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
          // imageDueDate: today,
        },
      });
      let allBlogUploadComplete = await BlogUpload.count({
        where: {
          uploadStatus: "PROCESSING",
          projectId: element.id,
          // uploadDueDate: today,
        },
      });
      let allPostContentCount = await SocialMediaContent.count({
        where: {
          postContentStatus: "PROCESSING",
          projectId: element.id,
          // postContentDueDate: today,
        },
      });
      let allMediaCount = await SocialMedias.count({
        where: {
          mediaStatus: "PROCESSING",
          projectId: element.id,
          // mediaDueDate: today,
        },
      });
      let allMediaPostCount = await SocialMediaPost.count({
        where: {
          postStatus: "PROCESSING",
          projectId: element.id,
          // postDueDate: today,
        },
      });
      let allFourmComplete = await Fourm.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
      });
      let allSocialBookComplete = await SocialBook.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
      });
      let allSeoAuditComplete = await SeoAudit.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          isEdit: 1,
        },
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
      let allSeoAuditUnComplete = await SeoAudit.count({
        where: {
          status: "DELAY",
          projectId: element.id,
          isEdit: 1,
        },
      });

      // all uncompleted pending task count
      let allBacklinkUnCompletePending = await Backlink.count({
        where: { status: "PENDING", projectId: element.id },
      });
      let allBlogTopicUnCompletePending = await BlogTopic.count({
        where: { topicStatus: "PENDING", projectId: element.id },
      });
      let allBlogImageUnCompletePending = await BlogImage.count({
        where: { imageStatus: "PENDING", projectId: element.id },
      });
      let allBlogUploadUnCompletePending = await BlogUpload.count({
        where: { uploadStatus: "PENDING", projectId: element.id },
      });
      let allSocialMediaUncompletePending = await SocialMediaContent.count({
        where: { postContentStatus: "PENDING", projectId: element.id },
      });
      let allMediaUncompletePending = await SocialMedias.count({
        where: {
          mediaStatus: "PENDING",
          projectId: element.id,
        },
      });
      let allMediaPostUncompletePending = await SocialMediaPost.count({
        where: {
          postStatus: "PENDING",
          projectId: element.id,
        },
      });
      let allFourmUnCompletePending = await Fourm.count({
        where: { status: "PENDING", projectId: element.id },
      });
      let allSocialBookUnCompletePending = await SocialBook.count({
        where: { status: "PENDING", projectId: element.id },
      });
      let allSeoAuditUnCompletePending = await SeoAudit.count({
        where: {
          status: "PENDING",
          projectId: element.id,
          isEdit: 1,
        },
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
        allSocialBookComplete +
        allSeoAuditComplete;

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
        allSocialBookUnComplete +
        allBacklinkUnCompletePending +
        allBlogTopicUnCompletePending +
        allBlogImageUnCompletePending +
        allBlogUploadUnCompletePending +
        allSocialMediaUncompletePending +
        allMediaUncompletePending +
        allMediaPostUncompletePending +
        allFourmUnCompletePending +
        allSocialBookUnCompletePending +
        allSeoAuditUnComplete +
        allSeoAuditUnCompletePending;

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
// **********get all project api controller**********
exports.getAllProjectEmployeeTask = async (req) => {
  try {
    const { user } = req.body;
    console.log(user, "***********************");
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
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });
      let allBlogTopicComplete = await BlogTopic.count({
        where: {
          topicStatus: "PROCESSING",
          projectId: element.id,
          // topicDueDate: today,
          topicAssignee: user,
        },
      });
      let allBlogImageComplete = await BlogImage.count({
        where: {
          imageStatus: "PROCESSING",
          projectId: element.id,
          // imageDueDate: today,
          imageAssignee: user,
        },
      });
      let allBlogUploadComplete = await BlogUpload.count({
        where: {
          uploadStatus: "PROCESSING",
          projectId: element.id,
          // uploadDueDate: today,
          uploadAssignee: user,
        },
      });
      let allPostContentCount = await SocialMediaContent.count({
        where: {
          postContentStatus: "PROCESSING",
          projectId: element.id,
          // postContentDueDate: today,
          postContentAssignee: user,
        },
      });
      let allMediaCount = await SocialMedias.count({
        where: {
          mediaStatus: "PROCESSING",
          projectId: element.id,
          // mediaDueDate: today,
          mediaAssignee: user,
        },
      });
      let allMediaPostCount = await SocialMediaPost.count({
        where: {
          postStatus: "PROCESSING",
          projectId: element.id,
          // postDueDate: today,
          postAssignee: user,
        },
      });
      let allFourmComplete = await Fourm.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });
      let allSocialBookComplete = await SocialBook.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });
      let allSeoAuditComplete = await SeoAudit.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          isEdit: 1,
          assign: user,
        },
      });

      // all uncompleted task count
      let allBacklinkUnComplete = await Backlink.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });
      let allBlogTopicUnComplete = await BlogTopic.count({
        where: {
          topicStatus: "DELAY",
          projectId: element.id,
          topicAssignee: user,
        },
      });
      let allBlogImageUnComplete = await BlogImage.count({
        where: {
          imageStatus: "DELAY",
          projectId: element.id,
          imageAssignee: user,
        },
      });
      let allBlogUploadUnComplete = await BlogUpload.count({
        where: {
          uploadStatus: "DELAY",
          projectId: element.id,
          uploadAssignee: user,
        },
      });
      let allSocialMediaUncomplete = await SocialMediaContent.count({
        where: {
          postContentStatus: "DELAY",
          projectId: element.id,
          postContentAssignee: user,
        },
      });
      let allMediaUncomplete = await SocialMedias.count({
        where: {
          mediaStatus: "DELAY",
          projectId: element.id,
          mediaAssignee: user,
        },
      });
      let allMediaPostUncomplete = await SocialMediaPost.count({
        where: {
          postStatus: "DELAY",
          projectId: element.id,
          postAssignee: user,
        },
      });
      let allFourmUnComplete = await Fourm.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });
      let allSocialBookUnComplete = await SocialBook.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });
      let allSeoAuditUnComplete = await SeoAudit.count({
        where: {
          status: "DELAY",
          projectId: element.id,
          isEdit: 1,
          assign: user,
        },
      });

      // all uncompleted pending task count
      let allBacklinkUnCompletePending = await Backlink.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });
      let allBlogTopicUnCompletePending = await BlogTopic.count({
        where: {
          topicStatus: "PENDING",
          projectId: element.id,
          topicAssignee: user,
        },
      });
      let allBlogImageUnCompletePending = await BlogImage.count({
        where: {
          imageStatus: "PENDING",
          projectId: element.id,
          imageAssignee: user,
        },
      });
      let allBlogUploadUnCompletePending = await BlogUpload.count({
        where: {
          uploadStatus: "PENDING",
          projectId: element.id,
          uploadAssignee: user,
        },
      });
      let allSocialMediaUncompletePending = await SocialMediaContent.count({
        where: {
          postContentStatus: "PENDING",
          projectId: element.id,
          postContentAssignee: user,
        },
      });
      let allMediaUncompletePending = await SocialMedias.count({
        where: {
          mediaStatus: "PENDING",
          projectId: element.id,
          mediaAssignee: user,
        },
      });
      let allMediaPostUncompletePending = await SocialMediaPost.count({
        where: {
          postStatus: "PENDING",
          projectId: element.id,
          postAssignee: user,
        },
      });
      let allFourmUnCompletePending = await Fourm.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });
      let allSocialBookUnCompletePending = await SocialBook.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });
      let allSeoAuditUnCompletePending = await SeoAudit.count({
        where: {
          status: "PENDING",
          projectId: element.id,
          isEdit: 1,
          assign: user,
        },
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
        allSocialBookComplete +
        allSeoAuditComplete;

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
        allSocialBookUnComplete +
        allBacklinkUnCompletePending +
        allBlogTopicUnCompletePending +
        allBlogImageUnCompletePending +
        allBlogUploadUnCompletePending +
        allSocialMediaUncompletePending +
        allMediaUncompletePending +
        allMediaPostUncompletePending +
        allFourmUnCompletePending +
        allSocialBookUnCompletePending +
        allSeoAuditUnComplete +
        allSeoAuditUnCompletePending;

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
    // let allBlog = await Blog.findAll();
    let allBlogTopic = await BlogTopic.findAll();
    let allBlogImage = await BlogImage.findAll();
    let allBlogUpload = await BlogUpload.findAll();
    let allFourm = await Fourm.findAll();
    let allSocialBook = await SocialBook.findAll();
    let allSocialMediaContent = await SocialMediaContent.findAll();
    let allSocialMedias = await SocialMedias.findAll();
    let allSocialMediaPost = await SocialMediaPost.findAll();
    let allSeoAudit = await SeoAudit.findAll({ where: { isEdit: "1" } });

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
    allSeoAudit.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assign,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allBlogTopic.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.topicAssignee,
        dueDate: i.dataValues.topicDueDate,
        status: i.dataValues.topicStatus,
      });
    });
    allBlogUpload.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.uploadAssignee,
        dueDate: i.dataValues.uploadDueDate,
        status: i.dataValues.uploadStatus,
      });
    });
    allBlogImage.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.imageAssignee,
        dueDate: i.dataValues.imageDueDate,
        status: i.dataValues.imageStatus,
      });
    });
    allSocialMediaContent.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postContentAssignee,
        dueDate: i.dataValues.postContentDueDate,
        status: i.dataValues.postContentStatus,
      });
    });
    allSocialMedias.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.mediaAssignee,
        dueDate: i.dataValues.mediaDueDate,
        status: i.dataValues.mediaStatus,
      });
    });
    allSocialMediaPost.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postAssignee,
        dueDate: i.dataValues.postDueDate,
        status: i.dataValues.postStatus,
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
          projectName: data.projectName,
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
    let allBlogTopic = await BlogTopic.findAll({ where: { projectId } });
    let allBlogImage = await BlogImage.findAll({ where: { projectId } });
    let allBlogUpload = await BlogUpload.findAll({ where: { projectId } });
    let allFourm = await Fourm.findAll({ where: { projectId } });
    let allSocialBook = await SocialBook.findAll({ where: { projectId } });

    let allSocialMediaContent = await SocialMediaContent.findAll({
      where: { projectId },
    });
    let allSocialMedias = await SocialMedias.findAll({ where: { projectId } });
    let allSocialMediaPost = await SocialMediaPost.findAll({
      where: { projectId },
    });

    let allSeoAudit = await SeoAudit.findAll({
      where: { projectId, isEdit: "1" },
    });

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
    allSeoAudit.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        assignee: i.dataValues.assign,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allBlogTopic.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.topicAssignee,
        dueDate: i.dataValues.topicDueDate,
        status: i.dataValues.topicStatus,
      });
    });
    allBlogUpload.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.uploadAssignee,
        dueDate: i.dataValues.uploadDueDate,
        status: i.dataValues.uploadStatus,
      });
    });
    allBlogImage.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.imageAssignee,
        dueDate: i.dataValues.imageDueDate,
        status: i.dataValues.imageStatus,
      });
    });
    allSocialMediaContent.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postContentAssignee,
        dueDate: i.dataValues.postContentDueDate,
        status: i.dataValues.postContentStatus,
      });
    });
    allSocialMedias.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.mediaAssignee,
        dueDate: i.dataValues.mediaDueDate,
        status: i.dataValues.mediaStatus,
      });
    });
    allSocialMediaPost.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postAssignee,
        dueDate: i.dataValues.postDueDate,
        status: i.dataValues.postStatus,
      });
    });

    allFourm.map((i) => {
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

    allSocialBook.map((i) => {
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

    // allSocialMedia.map((i) => {
    //   allProjectTaskById.push({
    //     id: i.dataValues.id,
    //     taskType: i.dataValues.taskType,
    //     projectId: i.dataValues.projectId,
    //     projectName: i.dataValues.projectName,
    //     dueDate: i.dataValues.dueDate,
    //     status: i.dataValues.status,
    //   });
    // });

    const newArray = [];
    for (ele of allProjectTaskById) {
      let allProject = await Project.findAll({ where: { id: ele.projectId } });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          taskType: ele.taskType,
          projectId: ele.projectId,
          projectName: data.projectName,
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
// **********get all project task on the basis of projectId and userid api controller**********
exports.getAllProjectTaskUserById = async (req) => {
  try {
    const { projectId, user } = req.body;

    // find all task on the basis of projectId
    let allBacklink = await Backlink.findAll({
      where: { projectId, assignee: user },
    });
    let allBlogTopic = await BlogTopic.findAll({
      where: { projectId, topicAssignee: user },
    });
    let allBlogImage = await BlogImage.findAll({
      where: { projectId, imageAssignee: user },
    });
    let allBlogUpload = await BlogUpload.findAll({
      where: { projectId, uploadAssignee: user },
    });
    let allFourm = await Fourm.findAll({
      where: { projectId, assignee: user },
    });
    let allSocialBook = await SocialBook.findAll({
      where: { projectId, assignee: user },
    });

    let allSocialMediaContent = await SocialMediaContent.findAll({
      where: { projectId, postContentAssignee: user },
    });
    let allSocialMedias = await SocialMedias.findAll({
      where: { projectId, mediaAssignee: user },
    });
    let allSocialMediaPost = await SocialMediaPost.findAll({
      where: { projectId, postAssignee: user },
    });

    let allSeoAudit = await SeoAudit.findAll({
      where: { projectId, assign: user, isEdit: "1" },
    });

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
    allSeoAudit.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        assignee: i.dataValues.assign,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allBlogTopic.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.topicAssignee,
        dueDate: i.dataValues.topicDueDate,
        status: i.dataValues.topicStatus,
      });
    });
    allBlogUpload.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.uploadAssignee,
        dueDate: i.dataValues.uploadDueDate,
        status: i.dataValues.uploadStatus,
      });
    });
    allBlogImage.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.imageAssignee,
        dueDate: i.dataValues.imageDueDate,
        status: i.dataValues.imageStatus,
      });
    });
    allSocialMediaContent.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postContentAssignee,
        dueDate: i.dataValues.postContentDueDate,
        status: i.dataValues.postContentStatus,
      });
    });
    allSocialMedias.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.mediaAssignee,
        dueDate: i.dataValues.mediaDueDate,
        status: i.dataValues.mediaStatus,
      });
    });
    allSocialMediaPost.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postAssignee,
        dueDate: i.dataValues.postDueDate,
        status: i.dataValues.postStatus,
      });
    });

    allFourm.map((i) => {
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

    allSocialBook.map((i) => {
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

    // allSocialMedia.map((i) => {
    //   allProjectTaskById.push({
    //     id: i.dataValues.id,
    //     taskType: i.dataValues.taskType,
    //     projectId: i.dataValues.projectId,
    //     projectName: i.dataValues.projectName,
    //     dueDate: i.dataValues.dueDate,
    //     status: i.dataValues.status,
    //   });
    // });

    const newArray = [];
    for (ele of allProjectTaskById) {
      let allProject = await Project.findAll({ where: { id: ele.projectId } });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          taskType: ele.taskType,
          projectId: ele.projectId,
          projectName: data.projectName,
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
exports.getAllProjectTaskByUser = async (req) => {
  try {
    const { user } = req.body;

    // find all task on the basis of projectId
    let allBacklink = await Backlink.findAll({
      where: { assignee: user },
    });
    let allBlogTopic = await BlogTopic.findAll({
      where: { topicAssignee: user },
    });
    let allBlogImage = await BlogImage.findAll({
      where: { imageAssignee: user },
    });
    let allBlogUpload = await BlogUpload.findAll({
      where: { uploadAssignee: user },
    });
    let allFourm = await Fourm.findAll({
      where: { assignee: user },
    });
    let allSocialBook = await SocialBook.findAll({
      where: { assignee: user },
    });

    let allSocialMediaContent = await SocialMediaContent.findAll({
      where: { postContentAssignee: user },
    });
    let allSocialMedias = await SocialMedias.findAll({
      where: { mediaAssignee: user },
    });
    let allSocialMediaPost = await SocialMediaPost.findAll({
      where: { postAssignee: user },
    });

    let allSeoAudit = await SeoAudit.findAll({
      where: { assign: user, isEdit: "1" },
    });

    let allProjectTaskById = [];

    await allBacklink.map((i) => {
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
    await allSeoAudit.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        assignee: i.dataValues.assign,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    await allBlogTopic.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.topicAssignee,
        dueDate: i.dataValues.topicDueDate,
        status: i.dataValues.topicStatus,
      });
    });
    await allBlogUpload.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.uploadAssignee,
        dueDate: i.dataValues.uploadDueDate,
        status: i.dataValues.uploadStatus,
      });
    });
    await allBlogImage.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "BLOG",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.imageAssignee,
        dueDate: i.dataValues.imageDueDate,
        status: i.dataValues.imageStatus,
      });
    });
    await allSocialMediaContent.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postContentAssignee,
        dueDate: i.dataValues.postContentDueDate,
        status: i.dataValues.postContentStatus,
      });
    });
    await allSocialMedias.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.mediaAssignee,
        dueDate: i.dataValues.mediaDueDate,
        status: i.dataValues.mediaStatus,
      });
    });
    await allSocialMediaPost.map((i) => {
      allProjectTaskById.push({
        id: i.dataValues.id,
        taskType: "SOCIALMEDIA",
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.postAssignee,
        dueDate: i.dataValues.postDueDate,
        status: i.dataValues.postStatus,
      });
    });

    await allFourm.map((i) => {
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

    await allSocialBook.map((i) => {
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

    const newArray = [];

    for (ele of allProjectTaskById) {
      let allProject = await Project.findAll({ where: { id: ele.projectId } });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          taskType: ele.taskType,
          projectId: ele.projectId,
          projectName: data.projectName,
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

// **********get task on the basis of projectId, and taskType **********
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
