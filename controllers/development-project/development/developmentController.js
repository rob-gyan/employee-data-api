let db = require("../../../models");

const Development = db.developments;
const DevelopmentProject = db.developmentproject;

// **********development create api controller**********
exports.developmentCreate = async (req) => {
  // console.log(req.body);
  try {
    let {
      task,
      type,
      codePush,
      referenceLiveLinks,
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

    // create development
    var developmentCreate = await Development.create({
      task,
      type,
      codePush,
      referenceLiveLinks,
      note,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      taskType: "DEVELOPMENT",
      projectName: projectFind.dataValues.projectName,
      status: DynamicStatus,
      createdBy: createdBy,
      assignedBy: assignee === "" ? null : assignedBy,
    });

    return {
      data: developmentCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********development update api controller**********
exports.developmentUpdate = async (req) => {
  try {
    let {
      developmentId,
      task,
      type,
      codePush,
      referenceLiveLinks,
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
    if (
      developmentId == "" ||
      projectId == "" ||
      !developmentId ||
      !projectId
    ) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find development
    let developmentFind = await Development.findOne({
      where: { id: developmentId, projectId },
    });

    // if development doesn't exist
    if (developmentFind == null) {
      return {
        data: null,
        error: "development doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update development
    var updatedevelopment = await developmentFind.update({
      developmentId,
      task,
      type,
      codePush,
      referenceLiveLinks,
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
        developmentFind.assignee === assignee
          ? developmentFind.assignedBy
          : assignedBy,
    });

    return {
      data: updatedevelopment,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********development update status api controller**********
exports.developmentUpdateStatus = async (req) => {
  try {
    let { developmentId, projectId, status } = req.body;

    if (
      developmentId == "" ||
      projectId == "" ||
      !developmentId ||
      !projectId
    ) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find development
    let developmentFind = await Development.findOne({
      where: { id: developmentId, projectId },
    });

    // if development doesn't exist
    if (developmentFind == null) {
      return {
        data: null,
        error: "development doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update development
    await developmentFind.update({
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

// **********development update time api controller**********
exports.developmentUpdateTime = async (req) => {
  try {
    let { developmentId, time, projectId } = req.body;

    if (
      developmentId == "" ||
      projectId == "" ||
      !developmentId ||
      !projectId
    ) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find development
    let developmentFind = await development.findOne({
      where: { id: developmentId, projectId },
    });

    // if development doesn't exist
    if (developmentFind == null) {
      return {
        data: null,
        error: "development doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    const prevTime =
      developmentFind.time == "" || developmentFind.time === null
        ? 0
        : developmentFind.time;
    const updateTime = parseInt(prevTime) + parseInt(time);

    // update development
    await developmentFind.update({
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

// **********get all development api controller**********
exports.getAllDevelopment = async (req) => {
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
    // find all development
    let alldevelopment = await Development.findAll({ where: { projectId } });

    // get todate date
    // const today = (new Date().getTime() / 1000).toFixed(0).toString();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let ele of alldevelopment) {
      let overDate = new Date(ele.dueDate);

      if (
        overDate < today &&
        ele.status != "ONHOLD" &&
        ele.status != "UNASSIGNED" &&
        ele.status != "COMPLETE" &&
        ele.status != "PROCESSING"
      ) {
        const developmentStatus = await Development.findOne({
          where: { id: ele.id },
        });
        await developmentStatus.update({ status: "DELAY" });
      }
    }
    return {
      data: alldevelopment,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete development api by id controller**********
exports.deleteDevelopment = async (req) => {
  try {
    let { developmentId } = req.body;
    if (developmentId == "" || !developmentId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let deleteDevelopment = await Development.destroy({
      where: { id: developmentId },
    });

    // if development doesn't exist
    if (deleteDevelopment == 0) {
      return {
        data: null,
        error: "development doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteDevelopment,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId,developmentId  **********
exports.getDevelopmentTask = async (req) => {
  const { developmentId, projectId } = req.body;
  if (developmentId == "" || projectId == "" || !developmentId || !projectId) {
    return {
      data: null,
      error: "something went wrong",
      message: "Failed",
      statusCode: 400,
    };
  }
  try {
    // find development
    let alldevelopment = await Development.findOne({
      where: { id: developmentId, projectId },
    });

    const data = alldevelopment;
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
