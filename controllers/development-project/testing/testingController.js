let db = require("../../../models");

const Testing = db.testings;
const DevelopmentProject = db.developmentproject;

// **********testing create api controller**********
exports.testingCreate = async (req) => {
  try {
    let {
      task,
      type,
      codePush,
      completed,
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

    // create testing
    var testingCreate = await Testing.create({
      task,
      type,
      codePush,
      completed,
      referenceLiveLinks,
      note,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      projectId,
      taskType: "TESTING",
      projectName: projectFind.dataValues.projectName,
      status: DynamicStatus,
      createdBy: createdBy,
      assignedBy: assignee === "" ? null : assignedBy,
    });

    return {
      data: testingCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********testing update api controller**********
exports.testingUpdate = async (req) => {
  try {
    let {
      testingId,
      task,
      type,
      codePush,
      completed,
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
    if (testingId == "" || projectId == "" || !testingId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find testing
    let testingFind = await Testing.findOne({
      where: { id: testingId, projectId },
    });

    // if testing doesn't exist
    if (testingFind == null) {
      return {
        data: null,
        error: "testing doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update testing
    var updatetesting = await testingFind.update({
      testingId,
      task,
      type,
      codePush,
      completed,
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
        testingFind.assignee === assignee ? testingFind.assignedBy : assignedBy,
    });

    return {
      data: updatetesting,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********testing update status api controller**********
exports.testingUpdateStatus = async (req) => {
  try {
    let { testingId, projectId, status } = req.body;

    if (testingId == "" || projectId == "" || !testingId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find testing
    let testingFind = await Testing.findOne({
      where: { id: testingId, projectId },
    });

    // if testing doesn't exist
    if (testingFind == null) {
      return {
        data: null,
        error: "testing doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update testing
    await testingFind.update({
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

// **********testing update time api controller**********
exports.testingUpdateTime = async (req) => {
  try {
    let { testingId, time, projectId } = req.body;

    if (testingId == "" || projectId == "" || !testingId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find testing
    let testingFind = await Testing.findOne({
      where: { id: testingId, projectId },
    });

    // if testing doesn't exist
    if (testingFind == null) {
      return {
        data: null,
        error: "testing doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    const prevTime =
      testingFind.time == "" || testingFind.time === null
        ? 0
        : testingFind.time;
    const updateTime = parseInt(prevTime) + parseInt(time);

    // update testing
    await testingFind.update({
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

// **********get all testing api controller**********
exports.getAllTesting = async (req) => {
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
    // find all testing
    let alltesting = await Testing.findAll({ where: { projectId } });

    // get todate date
    // const today = (new Date().getTime() / 1000).toFixed(0).toString();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let ele of alltesting) {
      let overDate = new Date(ele.dueDate);

      if (
        overDate < today &&
        ele.status != "ONHOLD" &&
        ele.status != "UNASSIGNED" &&
        ele.status != "COMPLETE" &&
        ele.status != "PROCESSING"
      ) {
        const testingStatus = await Testing.findOne({
          where: { id: ele.id },
        });
        await testingStatus.update({ status: "DELAY" });
      }
    }
    return {
      data: alltesting,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete testing api by id controller**********
exports.deleteTesting = async (req) => {
  try {
    let { testingId } = req.body;
    if (testingId == "" || !testingId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let deletetesting = await Testing.destroy({
      where: { id: testingId },
    });

    // if testing doesn't exist
    if (deletetesting == 0) {
      return {
        data: null,
        error: "testing doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deletetesting,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId,testingId  **********
exports.getTestingTask = async (req) => {
  const { testingId, projectId } = req.body;
  if (testingId == "" || projectId == "" || !testingId || !projectId) {
    return {
      data: null,
      error: "something went wrong",
      message: "Failed",
      statusCode: 400,
    };
  }
  try {
    // find testing
    let alltesting = await Testing.findOne({
      where: { id: testingId, projectId },
    });

    const data = alltesting;
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
