let db = require("../../../models");

const Fourm = db.fourms;
const Category = db.categories;
const Keyword = db.keywords;
const Profile = db.profiles;
const Project = db.projects;

// **********Fourm create api controller**********
exports.fourmCreate = async (req) => {
  try {
    let {
      type,
      category,
      keywordGroup,
      profile,
      url,
      liveLinks,
      assignee,
      amount,
      startDate,
      dueDate,
      status,
      estimateTime,
      projectId,
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

    // create Fourm
    var fourmCreate = await Fourm.create({
      type,
      category,
      keywordGroup,
      profile,
      url,
      liveLinks,
      assignee,
      amount,
      startDate,
      dueDate,
      status,
      estimateTime,
      projectId,
      projectName: projectFind.dataValues.projectName,
      taskType: "FOURM",
    });
    // find category
    let categoryFind = await Category.findOne({
      where: { category },
    });

    if (categoryFind == null) {
      await Category.create({ category });
    }
    // find profile
    let profileFind = await Profile.findOne({
      where: { profile },
    });

    if (profileFind == null) {
      await Profile.create({ profile });
    }

    // find keyword
    let keywordFind = await Keyword.findOne({
      where: { keyword: keywordGroup },
    });
    if (keywordFind == null) {
      await Keyword.create({ keyword: keywordGroup, projectId });
    }

    return {
      data: fourmCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********fourm update api controller**********
exports.fourmUpdate = async (req) => {
  try {
    let {
      fourmId,
      projectId,
      type,
      category,
      keywordGroup,
      profile,
      url,
      liveLinks,
      assignee,
      amount,
      startDate,
      dueDate,
      status,
      estimateTime,
    } = req.body;

    if (fourmId == "" || projectId == "" || !fourmId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find fourm
    let fourmFind = await Fourm.findOne({
      where: { id: fourmId, projectId },
    });

    // if fourm doesn't exist
    if (fourmFind == null) {
      return {
        data: null,
        error: "Fourm doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update fourm
    var updateFourm = await fourmFind.update({
      type,
      category,
      keywordGroup,
      profile,
      url,
      liveLinks,
      assignee,
      amount,
      startDate,
      dueDate,
      status,
      estimateTime,
    });

    return {
      data: updateFourm,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all Fourm api controller**********
exports.getAllFourms = async (req) => {
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
    // find all Fourm
    let allFourm = await Fourm.findAll({ where: { projectId } });

    return {
      data: allFourm,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get  Fourm by id api controller**********
exports.getFourmById = async (req) => {
  try {
    const { projectId, fourmId } = req.body;
    if (projectId == "" || !projectId || fourmId == "" || !fourmId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find  Fourm by fourm id
    let allFourm = await Fourm.findOne({ where: { projectId, id: fourmId } });

    return {
      data: allFourm,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********fourm update status api controller**********
exports.fourmUpdateStatus = async (req) => {
  try {
    let { fourmId, projectId, status } = req.body;

    if (fourmId == "" || projectId == "" || !fourmId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find fourm
    let fourmFind = await Fourm.findOne({
      where: { id: fourmId, projectId },
    });

    // if fourm doesn't exist
    if (fourmFind == null) {
      return {
        data: null,
        error: "fourm doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update fourm
    await fourmFind.update({
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

// **********fourm update time api controller**********
exports.fourmUpdateTime = async (req) => {
  try {
    let { fourmId, time, projectId } = req.body;

    if (fourmId == "" || projectId == "" || !fourmId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find fourm
    let fourmFind = await Fourm.findOne({
      where: { id: fourmId, projectId },
    });

    // if fourm doesn't exist
    if (fourmFind == null) {
      return {
        data: null,
        error: "fourm doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update fourm
    await fourmFind.update({
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

// **********delete Fourm api by id controller**********
exports.deleteFourm = async (req) => {
  try {
    let { fourmId } = req.body;
    if (fourmId == "" || !fourmId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let deleteFourm = await Fourm.destroy({
      where: { id: fourmId },
    });

    // if Fourm doesn't exist
    if (deleteFourm == 0) {
      return {
        data: null,
        error: "Fourm doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteFourm,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
