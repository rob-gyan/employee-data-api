let db = require("../../../models");

const SocialBook = db.socialbooks;
const SocialTag = db.socialtags;
const UrlBlog = db.urlblogs;
const Project = db.projects;

// **********socialBook create api controller**********
exports.socialBookCreate = async (req) => {
  try {
    let {
      urlBlog,
      tags,
      topicTagsKeyword,
      liveLinks,
      assignee,
      startDate,
      dueDate,
      amount,
      timeEstimation,
      status,
      projectId,
      time,
    } = req.body;

    if (projectId == "" || !projectId) {
      return {
        data: null,
        error: "something went wrong",
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
        error: "project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find urlblog
    let urlBlogs = await UrlBlog.findOne({
      where: { urlBlog, projectId },
    });

    if (urlBlogs == null) {
      await UrlBlog.create({ urlBlog, projectId });
    }

    // find social tags
    let socialTag = await SocialTag.findOne({
      where: { tags, projectId },
    });

    if (socialTag == null) {
      await SocialTag.create({ tags, projectId });
    }

    // create socialBook
    var socialBookCreate = await SocialBook.create({
      urlBlog,
      tags,
      topicTagsKeyword,
      liveLinks,
      assignee,
      startDate,
      dueDate,
      amount,
      timeEstimation,
      status: assignee === "" ? "UNASSIGNED" : status,
      projectId,
      time,
      taskType: "SOCIALBOOK",
      projectName: projectFind.dataValues.projectName,
    });

    return {
      data: socialBookCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********socialBook update api controller**********
exports.socialBookUpdate = async (req) => {
  try {
    let {
      socialBookId,
      projectId,
      urlBlog,
      tags,
      topicTagsKeyword,
      liveLinks,
      amount,
      assignee,
      startDate,
      dueDate,
      timeEstimation,
      status,
    } = req.body;

    if (socialBookId == "" || projectId == "" || !socialBookId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find socialBook
    let socialBookFind = await SocialBook.findOne({
      where: { id: socialBookId },
    });

    // if socialBook doesn't exist
    if (socialBookFind == null) {
      return {
        data: null,
        error: "socialBook doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find urlblog
    let urlBlogs = await UrlBlog.findOne({
      where: { urlBlog, projectId },
    });
    if (urlBlogs == null) {
      await UrlBlog.create({ urlBlog, projectId });
    }

    // find social tags
    let socialTag = await SocialTag.findOne({
      where: { tags, projectId },
    });
    if (socialTag == null) {
      await SocialTag.create({ tags, projectId });
    }
    // update socialBook
    var updateSocialBook = await socialBookFind.update({
      urlBlog,
      tags,
      topicTagsKeyword,
      liveLinks,
      amount,
      assignee,
      startDate,
      dueDate,
      timeEstimation,
      status,
    });

    return {
      data: updateSocialBook,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all SocialBook api controller**********
exports.getAllSocialBook = async (req) => {
  try {
    const { projectId } = req.body;
    if (projectId == "" || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find all SocialBook
    let allSocialBook = await SocialBook.findAll({ where: { projectId } });
    return {
      data: allSocialBook,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********socialBook update time api controller**********
exports.socialBookUpdateStatus = async (req) => {
  try {
    let { socialBookId, projectId, status } = req.body;
    if (projectId == "" || !projectId || socialBookId == "" || !socialBookId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find socialBook
    let socialBookFind = await SocialBook.findOne({
      where: { id: socialBookId, projectId },
    });

    // if socialBook doesn't exist
    if (socialBookFind == null) {
      return {
        data: null,
        error: "socialBook doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update socialBook
    await socialBookFind.update({
      status,
    });

    return {
      data: "Status updated",
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********socialBook update time api controller**********
exports.socialBookUpdateTime = async (req) => {
  try {
    let { socialBookId, projectId, time } = req.body;
    if (projectId == "" || !projectId || socialBookId == "" || !socialBookId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find socialBook
    let socialBookFind = await SocialBook.findOne({
      where: { id: socialBookId, projectId },
    });

    // if socialBook doesn't exist
    if (socialBookFind == null) {
      return {
        data: null,
        error: "socialBook doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update socialBook
    await socialBookFind.update({
      time,
    });

    return {
      data: "time updated",
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId,SocialBookId  **********
exports.getSocialBookTask = async (req) => {
  const { socialBookId, projectId } = req.body;
  try {
    // find SocialBook
    let allSocialBook = await SocialBook.findOne({
      where: { id: socialBookId, projectId },
    });

    const data = allSocialBook;
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

// **********delete SocialBook api by id controller**********
exports.deleteSocialBook = async (req) => {
  try {
    let { socialBookId } = req.body;
    let deleteSocialBook = await SocialBook.destroy({
      where: { id: socialBookId },
    });

    // if socialBook doesn't exist
    if (deleteSocialBook == 0) {
      return {
        data: null,
        error: "SocialBook doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteSocialBook,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
