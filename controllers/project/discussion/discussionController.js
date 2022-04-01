let db = require("../../../models");
const { uuid } = require("uuidv4");
let s3 = require("../../../aws_Bucket/upload/s3");
const fs = require("fs");

const Discussion = db.discussions;
const User = db.users;
const Project = db.projects;

// **********Discussion create api controller**********
exports.discussionCreate = async (req) => {
  try {
    let { message, userId, projectId, userEmailId, taskType, taskTypeId } =
      req.body;

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
    if (req.files == null) {
      // create Discussion
      var discussionCreate = await Discussion.create({
        message,
        userId,
        projectId,
        userEmailId,
        taskType,
        taskTypeId,
      });

      return {
        data: discussionCreate,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else {
      // upload image in aws bucket
      let image = req.files.imageUrl;
      const ab = fs.readFileSync(image.tempFilePath);
      let uploadMeta = await s3.uploadFile({
        Key: `${uuid()}-${Date.now()}`,
        ContentType: image.mimetype,
        Body: fs.readFileSync(image.tempFilePath),
      });
      const imageUrl = uploadMeta.key;

      // create Discussion
      var discussionCreate = await Discussion.create({
        message,
        imageUrl,
        userId,
        projectId,
        userEmailId,
        taskType,
        taskTypeId,
      });

      return {
        data: discussionCreate,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********discussion update api controller**********
exports.discussionUpdate = async (req) => {
  try {
    let { discussionId, projectId, message } = req.body;

    if (discussionId == "" || projectId == "" || !discussionId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find discussion
    let discussionFind = await Discussion.findOne({
      where: { id: discussionId },
    });

    // if discussion doesn't exist
    if (discussionFind == null) {
      return {
        data: null,
        error: "discussion doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update discussion
    var updateDiscussion = await discussionFind.update({
      message,
    });

    return {
      data: updateDiscussion,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all Discussion api controller**********
exports.getAllDiscussions = async (req) => {
  const { taskType, taskTypeId, projectId } = req.body;

  if (
    taskTypeId == "" ||
    projectId == "" ||
    taskType == "" ||
    !taskType ||
    !taskTypeId ||
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
    // find all Discussion
    let allDiscussions = await Discussion.findAll({
      where: { taskTypeId, taskType, projectId },
    });
    return {
      data: allDiscussions,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete Discussion api by id controller**********
exports.deleteDiscussion = async (req) => {
  try {
    let { discussionId } = req.body;
    let deleteDiscussion = await Discussion.destroy({
      where: { id: discussionId },
    });

    // if Discussion doesn't exist
    if (deleteDiscussion == 0) {
      return {
        data: null,
        error: "Discussion doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteDiscussion,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
