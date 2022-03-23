let db = require("../../../models");

const SeoAuditDiscussion = db.discussions;
const User = db.users;
const Project = db.projects;

// **********seoAuditDiscussion create api controller**********
exports.seoAuditDiscussionCreate = async (req) => {
  try {
    let {
      message,
      userId,
      projectId,
      userEmailId,
      taskType,
      seoAuditQuestion,
    } = req.body;

    if (userId == "" || projectId == "" || !userId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // console.log(req.body);
    // find user
    let userFind = await User.findOne({
      where: { id: userId },
    });

    // if user doesn't exist
    if (userFind == null) {
      return {
        data: null,
        error: "User Id doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find project
    let projectFind = await Project.findOne({
      where: { id: projectId },
    });
    // if project doesn't exist
    if (projectFind == null) {
      return {
        data: null,
        error: "Project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // create seoAuditDiscussion
    var seoAuditDiscussionCreate = await SeoAuditDiscussion.create({
      message,
      userId,
      projectId,
      userEmailId,
      taskType,
      seoAuditQuestion,
    });

    return {
      data: seoAuditDiscussionCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********seoAuditDiscussion update api controller**********
exports.seoAuditDiscussionUpdate = async (req) => {
  try {
    let { seoAuditQuestion, projectId, message } = req.body;

    if (
      seoAuditQuestion == "" ||
      projectId == "" ||
      !seoAuditQuestion ||
      !projectId
    ) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find seoAuditDiscussion
    let seoAuditDiscussionFind = await SeoAuditDiscussion.findOne({
      where: { seoAuditQuestion: seoAuditQuestion },
    });

    // if seoAuditDiscussion doesn't exist
    if (seoAuditDiscussionFind == null) {
      return {
        data: null,
        error: "seoAuditDiscussion doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update seoAuditDiscussion
    var updateseoAuditDiscussion = await SeoAuditDiscussion.update({
      message,
    });

    return {
      data: updateseoAuditDiscussion,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all seoAuditDiscussion api controller**********
exports.getAllseoAuditDiscussions = async (req) => {
  const { taskType, seoAuditQuestion, projectId } = req.body;

  if (
    seoAuditQuestion == "" ||
    projectId == "" ||
    taskType == "" ||
    !taskType ||
    !seoAuditQuestion ||
    !projectId
  ) {
    return {
      data: null,
      error: "something went wrong",
      message: "Failed",
      statusCode: 400,
    };
  }
  try {
    // find all seoAuditDiscussion
    let allseoAuditDiscussions = await SeoAuditDiscussion.findAll({
      where: { seoAuditQuestion, taskType, projectId },
    });
    return {
      data: allseoAuditDiscussions,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete seoAuditDiscussion api by id controller**********
exports.deleteseoAuditDiscussion = async (req) => {
  try {
    let { seoAuditQuestion } = req.body;
    let deleteseoAuditDiscussion = await SeoAuditDiscussion.destroy({
      where: { seoAuditQuestion: seoAuditQuestion },
    });

    // if seoAuditDiscussion doesn't exist
    if (deleteseoAuditDiscussion == 0) {
      return {
        data: null,
        error: "seoAuditDiscussion doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteseoAuditDiscussion,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
