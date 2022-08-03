let db = require("../../../models");

const Design = db.designs;
const Category = db.categories;
const Keyword = db.keywords;
const Profile = db.profiles;
const DevelopmentProject = db.developmentproject;
const Type = db.types;
const Url = db.urls;
const Test = db.tests;

// **********design create api controller**********
exports.designCreate = async (req) => {
  // console.log(req.body);
  try {
    let {
      task,
      type,
      xdLink,
      referenceLiveLinks,
      requestAssignee,
      note,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      status,
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
    let projectFind = await DevelopmentProject.findOne({
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

    // create design
    var designCreate = await Design.create({
      task,
      type,
      xdLink,
      requestAssignee,
      referenceLiveLinks,
      note,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      taskType: "DESIGN",
      projectName: projectFind.dataValues.projectName,
      status: DynamicStatus,
      createdBy: createdBy,
      assignedBy: assignee === "" ? null : assignedBy,
    });

    return {
      data: designCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********design update api controller**********
exports.designUpdate = async (req) => {
  try {
    let {
      designId,
      task,
      type,
      xdLink,
      referenceLiveLinks,
      requestAssignee,
      note,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      status,
      assignedBy,
      createdBy,
    } = req.body;
    if (designId == "" || projectId == "" || !designId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find design
    let designFind = await Design.findOne({
      where: { id: designId, projectId },
    });

    // if design doesn't exist
    if (designFind == null) {
      return {
        data: null,
        error: "design doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update design
    var updatedesign = await designFind.update({
      designId,
      task,
      type,
      xdLink,
      referenceLiveLinks,
      requestAssignee,
      note,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      status,
      createdBy,
      assignedBy:
        designFind.assignee === assignee ? designFind.assignedBy : assignedBy,
    });

    return {
      data: updatedesign,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********design update status api controller**********
exports.designUpdateStatus = async (req) => {
  try {
    let { designId, projectId, status } = req.body;

    if (designId == "" || projectId == "" || !designId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find design
    let designFind = await Design.findOne({
      where: { id: designId, projectId },
    });

    // if design doesn't exist
    if (designFind == null) {
      return {
        data: null,
        error: "design doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update design
    await designFind.update({
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

// **********design update time api controller**********
exports.designUpdateTime = async (req) => {
  try {
    let { designId, time, projectId } = req.body;

    if (designId == "" || projectId == "" || !designId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find design
    let designFind = await Design.findOne({
      where: { id: designId, projectId },
    });

    // if design doesn't exist
    if (designFind == null) {
      return {
        data: null,
        error: "design doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    const prevTime =
      designFind.time == "" || designFind.time === null ? 0 : designFind.time;
    const updateTime = parseInt(prevTime) + parseInt(time);

    // update design
    await designFind.update({
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

// **********get all design api controller**********
exports.getAlldesign = async (req) => {
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
    // find all design
    let alldesign = await Design.findAll({ where: { projectId } });

    // get todate date
    // const today = (new Date().getTime() / 1000).toFixed(0).toString();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let ele of alldesign) {
      let overDate = new Date(ele.dueDate);

      if (
        overDate < today &&
        ele.status != "ONHOLD" &&
        ele.status != "UNASSIGNED" &&
        ele.status != "COMPLETE" &&
        ele.status != "PROCESSING"
      ) {
        const designStatus = await Design.findOne({
          where: { id: ele.id },
        });
        await designStatus.update({ status: "DELAY" });
      }
    }
    return {
      data: alldesign,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete design api by id controller**********
exports.deleteDesign = async (req) => {
  try {
    let { designId } = req.body;
    if (designId == "" || !designId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let deletedesign = await Design.destroy({
      where: { id: designId },
    });

    // if design doesn't exist
    if (deletedesign == 0) {
      return {
        data: null,
        error: "design doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deletedesign,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId,designId  **********
exports.getDesignTask = async (req) => {
  const { designId, projectId } = req.body;
  if (designId == "" || projectId == "" || !designId || !projectId) {
    return {
      data: null,
      error: "something went wrong",
      message: "Failed",
      statusCode: 400,
    };
  }
  try {
    // find design
    let alldesign = await Design.findOne({
      where: { id: designId, projectId },
    });

    const data = alldesign;
    if (data == null) {
      return {
        data: null,
        error: null,
        message: "data not found",
        statusCode: 200,
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
