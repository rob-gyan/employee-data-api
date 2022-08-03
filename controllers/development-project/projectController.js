let db = require("../../models");
const seoAudit = require("../project/seoAudit/alltable");

// development model root
const DevlopmentProject = db.developmentproject;
const DevlopmentDiscussion = db.developmentdiscussions;
const Design = db.designs;
const Development = db.developments;
const RDTask = db.rdtasks;
const Testing = db.testings;
const Users = db.users;

// **********project create api controller**********
exports.projectCreate = async (req) => {
  try {
    let { projectName, description, clientCompany } = req.body;

    // create project
    var createProject = await DevlopmentProject.create({
      projectName,
      description,
      clientCompany,
      status: "ACTIVE",
      projectCreater: req.user,
      createrRole: req.role,
    });

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
    let project = await DevlopmentProject.findOne({
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
    let project = await DevlopmentProject.findOne({
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
    let allProject = await DevlopmentProject.findAll();
    let allProjects = [];
    for (const element of allProject) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      // console.log(today);
      // all completed task count
      let designComplete = await Design.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
      });
      let developmentComplete = await Development.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
      });
      let rdTaskCount = await RDTask.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
      });
      let testingComplete = await Testing.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
        },
      });

      // all uncompleted task count
      let allDesignUnComplete = await Design.count({
        where: { status: "DELAY", projectId: element.id },
      });
      let allDevelopmentUnComplete = await Development.count({
        where: { status: "DELAY", projectId: element.id },
      });
      let allRDTaskUnComplete = await RDTask.count({
        where: { status: "DELAY", projectId: element.id },
      });
      let allTestingUnComplete = await Testing.count({
        where: { status: "DELAY", projectId: element.id },
      });

      // all uncompleted pending task count
      let allDesignUnCompletePending = await Design.count({
        where: { status: "PENDING", projectId: element.id },
      });
      let allDevelopmentUnCompletePending = await Development.count({
        where: { status: "PENDING", projectId: element.id },
      });
      let allRDTaskUnCompletePending = await RDTask.count({
        where: { status: "PENDING", projectId: element.id },
      });
      let allTestingUnCompletePending = await Testing.count({
        where: { status: "PENDING", projectId: element.id },
      });

      // sum of completed task
      const totalCompleted =
        designComplete + developmentComplete + rdTaskCount + testingComplete;

      // sum of uncompleted task
      const totalUnCompleted =
        allDesignUnComplete +
        allDevelopmentUnComplete +
        allRDTaskUnComplete +
        allTestingUnComplete +
        allDesignUnCompletePending +
        allDevelopmentUnCompletePending +
        allRDTaskUnCompletePending +
        allTestingUnCompletePending;

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
    // find all project
    let allProject = await DevlopmentProject.findAll();
    let allProjects = [];
    for (const element of allProject) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      // all completed task count
      let designComplete = await Design.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });
      let developmentComplete = await Development.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });
      let rdTaskCount = await RDTask.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });
      let testingComplete = await Testing.count({
        where: {
          status: "PROCESSING",
          projectId: element.id,
          // dueDate: today,
          assignee: user,
        },
      });

      // all uncompleted task count
      let allDesignUnComplete = await Design.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });
      let allDevelopmentUnComplete = await Development.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });
      let allRDTaskUnComplete = await RDTask.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });
      let allTestingUnComplete = await Testing.count({
        where: { status: "DELAY", projectId: element.id, assignee: user },
      });

      // all uncompleted pending task count
      let allDesignUnCompletePending = await Design.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });
      let allDevelopmentUnCompletePending = await Development.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });
      let allRDTaskUnCompletePending = await RDTask.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });
      let allTestingUnCompletePending = await Testing.count({
        where: { status: "PENDING", projectId: element.id, assignee: user },
      });

      // sum of completed task
      const totalCompleted =
        designComplete + developmentComplete + rdTaskCount + testingComplete;

      // sum of uncompleted task
      const totalUnCompleted =
        allDesignUnComplete +
        allDevelopmentUnComplete +
        allRDTaskUnComplete +
        allTestingUnComplete +
        allDesignUnCompletePending +
        allDevelopmentUnCompletePending +
        allRDTaskUnCompletePending +
        allTestingUnCompletePending;

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
    let findProjectById = await DevlopmentProject.findOne({
      where: { id: projectId },
    });

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
    let allDesign = await Design.findAll();
    let allDevlopment = await Development.findAll();
    let allRDTask = await RDTask.findAll();
    let allTesting = await Testing.findAll();

    let allProjectTask = [];
    allDesign.map((i) => {
      console.log(i.dataValues.type);
      allProjectTask.push({
        id: i.dataValues.id,
        taskType: i.dataValues.taskType,
        task: i.dataValues.task,
        type: i.dataValues.type,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allDevlopment.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allRDTask.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allTesting.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        type: i.dataValues.type,
        task: i.dataValues.task,
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
      let allProject = await DevlopmentProject.findAll({
        where: { id: ele.projectId },
      });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          type: ele.type,
          taskType: ele.taskType,
          task: ele.task,
          projectId: ele.projectId,
          projectName: data.projectName,
          assignee: ele.assignee,
          dueDate: ele.dueDate,
          status: ele.status,
          createdAt: data.createdAt,
          projectCreater: data.projectCreater,
        });
      }
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
    let allDesign = await Design.findAll({ where: { projectId } });
    let allDevlopment = await Development.findAll({ where: { projectId } });
    let allRDTask = await RDTask.findAll({ where: { projectId } });
    let allTesting = await Testing.findAll({ where: { projectId } });

    let allProjectTask = [];
    allDesign.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allDevlopment.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assign,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allRDTask.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.topicAssignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allTesting.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.uploadAssignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });

    const newArray = [];
    for (ele of allProjectTask) {
      let allProject = await DevlopmentProject.findAll({
        where: { id: ele.projectId },
      });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          task: ele.task,
          type: ele.type,
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

    let allDesign = await Design.findAll({
      where: { projectId, assignee: user },
    });
    let allDevlopment = await Development.findAll({
      where: { projectId, assignee: user },
    });
    let allRDTask = await RDTask.findAll({
      where: { projectId, assignee: user },
    });
    let allTesting = await Testing.findAll({
      where: { projectId, assignee: user },
    });

    let allProjectTask = [];
    allDesign.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allDevlopment.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assign,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allRDTask.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allTesting.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
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
      let allProject = await DevlopmentProject.findAll({
        where: { id: ele.projectId },
      });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          type: ele.type,
          task: ele.task,
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
    let allDesign = await Design.findAll({
      where: { assignee: user },
    });
    let allDevlopment = await Development.findAll({
      where: { assignee: user },
    });
    let allRDTask = await RDTask.findAll({
      where: { assignee: user },
    });
    let allTesting = await Testing.findAll({
      where: { assignee: user },
    });

    let allProjectTask = [];
    allDesign.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allDevlopment.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assign,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allRDTask.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
        taskType: i.dataValues.taskType,
        projectId: i.dataValues.projectId,
        projectName: i.dataValues.projectName,
        assignee: i.dataValues.assignee,
        dueDate: i.dataValues.dueDate,
        status: i.dataValues.status,
      });
    });
    allTesting.map((i) => {
      allProjectTask.push({
        id: i.dataValues.id,
        task: i.dataValues.task,
        type: i.dataValues.type,
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
      let allProject = await DevlopmentProject.findAll({
        where: { id: ele.projectId },
      });

      for (data of allProject) {
        newArray.push({
          id: ele.id,
          type: data.type,
          task: ele.task,
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
    let allDesign = await Design.findAll({
      where: { id, projectId, taskType },
    });
    let allDevlopment = await Development.findAll({
      where: { id, projectId, taskType },
    });
    let allRDTask = await RDTask.findAll({
      where: { id, projectId, taskType },
    });
    let allTesting = await Testing.findAll({
      where: { id, projectId, taskType },
    });

    const data = allDesign || allDevlopment || allRDTask || allTesting;
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
// **********get task on the basis of projectId, and taskType **********
exports.getAllAssignee = async (req) => {
  try {
    let allAssignee = await Users.findAll();
    const assigneeArray = [];
    allAssignee.map((user) => {
      assigneeArray.push({ userId: user.id, assignee: user.user });
    });
    return {
      data: assigneeArray,
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
    let deleteProject = await DevlopmentProject.destroy({
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

    await Design.destroy({
      where: { projectId },
    });
    await Development.destroy({
      where: { projectId },
    });
    await RDTask.destroy({
      where: { projectId },
    });
    await Testing.destroy({
      where: { projectId },
    });
    // delete discussion
    await DevlopmentDiscussion.destroy({
      where: { projectId },
    });

    return {
      data: deleteProject,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
