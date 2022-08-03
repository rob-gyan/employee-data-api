let db = require("../../../models");

const Fourm = db.fourms;
const Category = db.categories;
const Keyword = db.keywords;
const Profile = db.profiles;
const Project = db.projects;
const Type = db.types;

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
      extraKeyword,
      assignedBy,
      createdBy,
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

    // set dynamic status
    let DynamicStatus;
    if (assignee === "") {
      DynamicStatus = "UNASSIGNED";
    } else if (status === "") {
      DynamicStatus = "PENDING";
    } else {
      DynamicStatus = status;
    }
    // create Fourm
    var fourmCreate = await Fourm.create({
      type,
      category,
      keywordGroup,
      extraKeyword,
      profile,
      url,
      liveLinks,
      assignee,
      amount: !amount ? 0 : amount,
      startDate,
      dueDate,
      status: DynamicStatus,
      estimateTime,
      projectId,
      projectName: projectFind.dataValues.projectName,
      taskType: "FOURM",
      createdBy: createdBy,
      assignedBy: assignee === "" ? null : assignedBy,
    });
    // find type
    let typeFind = await Type.findOne({
      where: { type },
    });

    if (typeFind == null) {
      await Type.create({ type });
    }
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
      extraKeyword,
      profile,
      url,
      liveLinks,
      assignee,
      amount,
      startDate,
      dueDate,
      status,
      estimateTime,
      assignedBy,
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
    // find type
    let typeFind = await Type.findOne({
      where: { type },
    });

    if (typeFind == null) {
      await Type.create({ type });
    }
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
    // await fourmFind.update({ liveLinks: "" });

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
      extraKeyword,
      assignedBy:
        fourmFind.assignee === assignee ? fourmFind.assignedBy : assignedBy,
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

    // get today date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let ele of allFourm) {
      let overDate = new Date(ele.dueDate);

      if (
        overDate < today &&
        ele.status != "ONHOLD" &&
        ele.status != "UNASSIGNED" &&
        ele.status != "COMPLETE" &&
        ele.status != "PROCESSING"
        // &&
        // ele.status != "PROCESSING"
      ) {
        const FourmStatus = await Fourm.findOne({
          where: { id: ele.id },
        });
        await FourmStatus.update({ status: "DELAY" });
      }
    }

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

    const prevTime =
      fourmFind.time == "" || fourmFind.time === null ? 0 : fourmFind.time;

    const updateTime = parseInt(prevTime) + parseInt(time);

    // update fourm
    await fourmFind.update({
      time: updateTime,
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
