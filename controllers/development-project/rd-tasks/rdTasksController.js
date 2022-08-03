let db = require("../../../models");

const RDTasks = db.rdtasks;
const Category = db.categories;
const Keyword = db.keywords;
const Profile = db.profiles;
const DevelopmentProject = db.developmentproject;

// **********RDTask create api controller**********
exports.rdTaskCreate = async (req) => {
  try {
    let {
      task,
      type,
      xdLink,
      referenceLiveLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      status,
      assignedBy,
      createdBy,
      note,
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
    // create RDTask
    var rdTaskCreate = await RDTasks.create({
      task,
      type,
      xdLink,
      referenceLiveLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      note,
      status: DynamicStatus,
      projectName: projectFind.dataValues.projectName,
      taskType: "RDTASK",
      createdBy: createdBy,
      assignedBy: assignee === "" ? null : assignedBy,
    });

    return {
      data: rdTaskCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********RDTask update api controller**********
exports.RDTaskUpdate = async (req) => {
  try {
    let {
      rdTaskId,
      task,
      type,
      xdLink,
      referenceLiveLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      status,
      assignedBy,

      note,
    } = req.body;

    if (rdTaskId == "" || projectId == "" || !rdTaskId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find RDTask
    let rdTaskFind = await RDTasks.findOne({
      where: { id: rdTaskId, projectId },
    });

    // if RDTask doesn't exist
    if (rdTaskFind == null) {
      return {
        data: null,
        error: "RDTask doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update RDTask
    var updateRDTask = await rdTaskFind.update({
      task,
      type,
      xdLink,
      referenceLiveLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      status,
      note,
      assignedBy:
        rdTaskFind.assignee === assignee ? rdTaskFind.assignedBy : assignedBy,
    });

    return {
      data: updateRDTask,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all RDTask api controller**********
exports.getAllRDTasks = async (req) => {
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
    // find all RDTask
    let allRDTask = await RDTasks.findAll({ where: { projectId } });

    // get today date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let ele of allRDTask) {
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
        const rdTaskStatus = await RDTasks.findOne({
          where: { id: ele.id },
        });
        await rdTaskStatus.update({ status: "DELAY" });
      }
    }

    return {
      data: allRDTask,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get  RDTask by id api controller**********
exports.getRDTaskById = async (req) => {
  try {
    const { projectId, rdTaskId } = req.body;
    if (projectId == "" || !projectId || rdTaskId == "" || !rdTaskId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find  RDTask by RDTask id
    let allRDTask = await RDTasks.findOne({
      where: { projectId, id: rdTaskId },
    });

    return {
      data: allRDTask,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********RDTask update status api controller**********
exports.rdTaskUpdateStatus = async (req) => {
  try {
    let { rdTaskId, projectId, status } = req.body;

    if (rdTaskId == "" || projectId == "" || !rdTaskId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find RDTask
    let rdTaskFind = await RDTasks.findOne({
      where: { id: rdTaskId, projectId },
    });

    // if RDTask doesn't exist
    if (rdTaskFind == null) {
      return {
        data: null,
        error: "RDTask doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update RDTask
    await rdTaskFind.update({
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

// **********RDTask update time api controller**********
exports.rdTaskUpdateTime = async (req) => {
  try {
    let { rdTaskId, time, projectId } = req.body;

    if (rdTaskId == "" || projectId == "" || !rdTaskId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find RDTask
    let rdTaskFind = await RDTasks.findOne({
      where: { id: rdTaskId, projectId },
    });
    console.log(rdTaskFind, "rdTaskFind");

    // if RDTask doesn't exist
    if (rdTaskFind == null) {
      return {
        data: null,
        error: "RDTask doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    const prevTime =
      rdTaskFind.time == "" || rdTaskFind.time === null ? 0 : RDTaskFind.time;

    const updateTime = parseInt(prevTime) + parseInt(time);

    // update RDTask
    await rdTaskFind.update({
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

// **********delete RDTask api by id controller**********
exports.deleteRDTask = async (req) => {
  try {
    let { rdTaskId } = req.body;
    if (rdTaskId == "" || !rdTaskId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let deleteRDTask = await RDTasks.destroy({
      where: { id: rdTaskId },
    });

    // if RDTask doesn't exist
    if (deleteRDTask == 0) {
      return {
        data: null,
        error: "RDTask doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteRDTask,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
