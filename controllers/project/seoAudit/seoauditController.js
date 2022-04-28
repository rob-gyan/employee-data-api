let db = require("../../../models");

const SeoAuditTable = db.seoaudittables;
const SeoAudit = db.seoaudits;
const Project = db.projects;
const CompetitionDb = db.seoaudittopkeywords;

// **********seoAudit update api controller**********
exports.seoAuditUpdate = async (req) => {
  try {
    let {
      projectType,
      checkQuestion,
      projectId,
      grading,
      assign,
      reassign,
      date,
      status,
      timeEstimation,
      time,
      topKey,
      competitionData,
      amount,
      note,
      startDate,
      dueDate,
    } = req.body;

    let updateSeoAudit;
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

    // find seoAudit
    let seoAuditFind = await SeoAudit.findOne({
      where: { checkQuestion, projectId },
    });

    if (seoAuditFind == null) {
      updateSeoAudit = await SeoAudit.create({
        projectType,
        checkQuestion,
        grading,
        assign,
        reassign,
        date,
        status,
        timeEstimation,
        time,
        projectId,
        topKey,
        competitionData,
        amount,
        startDate,
        dueDate,
        note,
        taskType: "SEOAUDIT",
        projectName: projectFind.dataValues.projectName,
      });
    } else {
      // update SeoAudit
      updateSeoAudit = await seoAuditFind.update({
        grading,
        assign,
        reassign,
        date,
        status,
        timeEstimation,
        time,
        topKey,
        competitionData,
        note,
        amount,
        startDate,
        dueDate,
      });
    }
    return {
      data: updateSeoAudit,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all SeoAudit by project id api controller**********
exports.getAllSeoAudit = async (req) => {
  const { projectId } = req.body;
  try {
    // find all SeoAudit
    let allSeoAudit = await SeoAudit.findAll({ where: { projectId } });
    return {
      data: allSeoAudit,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********seoAudit update status api controller**********
exports.seoAuditUpdateStatus = async (req) => {
  try {
    let { checkQuestion, status } = req.body;

    // find seoAudit
    let seoAuditFind = await SeoAudit.findOne({
      where: { checkQuestion },
    });

    // if seoAudit doesn't exist
    if (seoAuditFind == null) {
      return {
        data: null,
        error: "seoAudit doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update seoAudit
    await seoAuditFind.update({
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

// **********seoAudit update time api controller**********
exports.seoAuditUpdateTime = async (req) => {
  try {
    let { checkQuestion, time } = req.body;

    // find seoAudit
    let seoAuditFind = await SeoAudit.findOne({
      where: { checkQuestion },
    });

    // if seoAudit doesn't exist
    if (seoAuditFind == null) {
      return {
        data: null,
        error: "seoAudit doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update seoAudit
    await seoAuditFind.update({
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

// **********get project task on the basis of projectId,seoAuditId  **********
exports.getSeoAuditTask = async (req) => {
  const { checkQuestion, projectId } = req.body;
  try {
    // find SeoAudit
    let allSeoAudit = await SeoAudit.findOne({
      where: { checkQuestion: checkQuestion, projectId },
    });

    const data = allSeoAudit;
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
// **********create competition api on the basis of projectId **********
exports.createCompetitionApi = async (req) => {
  const {
    projectId,
    website1,
    keywordW10,
    keywordW11,
    keywordW12,
    keywordW13,
    keywordW14,
    keywordW15,
    keywordW16,
    keywordW17,
    keywordW18,
    keywordW19,
    positionW10,
    positionW11,
    positionW12,
    positionW13,
    positionW14,
    positionW15,
    positionW16,
    positionW17,
    positionW18,
    positionW19,
    trafficW10,
    trafficW11,
    trafficW12,
    trafficW13,
    trafficW14,
    trafficW15,
    trafficW16,
    trafficW17,
    trafficW18,
    trafficW19,
    website2,
    keywordW20,
    keywordW21,
    keywordW22,
    keywordW23,
    keywordW24,
    keywordW25,
    keywordW26,
    keywordW27,
    keywordW28,
    keywordW29,
    positionW20,
    positionW21,
    positionW22,
    positionW23,
    positionW24,
    positionW25,
    positionW26,
    positionW27,
    positionW28,
    positionW29,
    trafficW20,
    trafficW21,
    trafficW22,
    trafficW23,
    trafficW24,
    trafficW25,
    trafficW26,
    trafficW27,
    trafficW28,
    trafficW29,
    website3,
    keywordW30,
    keywordW31,
    keywordW32,
    keywordW33,
    keywordW34,
    keywordW35,
    keywordW36,
    keywordW37,
    keywordW38,
    keywordW39,
    positionW30,
    positionW31,
    positionW32,
    positionW33,
    positionW34,
    positionW35,
    positionW36,
    positionW37,
    positionW38,
    positionW39,
    trafficW30,
    trafficW31,
    trafficW32,
    trafficW33,
    trafficW34,
    trafficW35,
    trafficW36,
    trafficW37,
    trafficW38,
    trafficW39,
  } = req.body;
  try {
    // find SeoAudit
    let checkCompetition = await CompetitionDb.findOne({
      where: { projectId },
    });
    console.log(checkCompetition);
    let competitionData;

    if (checkCompetition === null) {
      competitionData = await CompetitionDb.create({
        projectId,
        website1,
        keywordW10,
        keywordW11,
        keywordW12,
        keywordW13,
        keywordW14,
        keywordW15,
        keywordW16,
        keywordW17,
        keywordW18,
        keywordW19,
        positionW10,
        positionW11,
        positionW12,
        positionW13,
        positionW14,
        positionW15,
        positionW16,
        positionW17,
        positionW18,
        positionW19,
        trafficW10,
        trafficW11,
        trafficW12,
        trafficW13,
        trafficW14,
        trafficW15,
        trafficW16,
        trafficW17,
        trafficW18,
        trafficW19,
        website2,
        keywordW20,
        keywordW21,
        keywordW22,
        keywordW23,
        keywordW24,
        keywordW25,
        keywordW26,
        keywordW27,
        keywordW28,
        keywordW29,
        positionW20,
        positionW21,
        positionW22,
        positionW23,
        positionW24,
        positionW25,
        positionW26,
        positionW27,
        positionW28,
        positionW29,
        trafficW20,
        trafficW21,
        trafficW22,
        trafficW23,
        trafficW24,
        trafficW25,
        trafficW26,
        trafficW27,
        trafficW28,
        trafficW29,
        website3,
        keywordW30,
        keywordW31,
        keywordW32,
        keywordW33,
        keywordW34,
        keywordW35,
        keywordW36,
        keywordW37,
        keywordW38,
        keywordW39,
        positionW30,
        positionW31,
        positionW32,
        positionW33,
        positionW34,
        positionW35,
        positionW36,
        positionW37,
        positionW38,
        positionW39,
        trafficW30,
        trafficW31,
        trafficW32,
        trafficW33,
        trafficW34,
        trafficW35,
        trafficW36,
        trafficW37,
        trafficW38,
        trafficW39,
      });
    } else {
      competitionData = await checkCompetition.update({
        website1,
        keywordW10,
        keywordW11,
        keywordW12,
        keywordW13,
        keywordW14,
        keywordW15,
        keywordW16,
        keywordW17,
        keywordW18,
        keywordW19,
        positionW10,
        positionW11,
        positionW12,
        positionW13,
        positionW14,
        positionW15,
        positionW16,
        positionW17,
        positionW18,
        positionW19,
        trafficW10,
        trafficW11,
        trafficW12,
        trafficW13,
        trafficW14,
        trafficW15,
        trafficW16,
        trafficW17,
        trafficW18,
        trafficW19,
        website2,
        keywordW20,
        keywordW21,
        keywordW22,
        keywordW23,
        keywordW24,
        keywordW25,
        keywordW26,
        keywordW27,
        keywordW28,
        keywordW29,
        positionW20,
        positionW21,
        positionW22,
        positionW23,
        positionW24,
        positionW25,
        positionW26,
        positionW27,
        positionW28,
        positionW29,
        trafficW20,
        trafficW21,
        trafficW22,
        trafficW23,
        trafficW24,
        trafficW25,
        trafficW26,
        trafficW27,
        trafficW28,
        trafficW29,
        website3,
        keywordW30,
        keywordW31,
        keywordW32,
        keywordW33,
        keywordW34,
        keywordW35,
        keywordW36,
        keywordW37,
        keywordW38,
        keywordW39,
        positionW30,
        positionW31,
        positionW32,
        positionW33,
        positionW34,
        positionW35,
        positionW36,
        positionW37,
        positionW38,
        positionW39,
        trafficW30,
        trafficW31,
        trafficW32,
        trafficW33,
        trafficW34,
        trafficW35,
        trafficW36,
        trafficW37,
        trafficW38,
        trafficW39,
      });
    }

    return {
      data: competitionData,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// **********show competition api on the basis of projectId **********
exports.showCompetitionApi = async (req) => {
  const { projectId } = req.body;
  try {
    // find SeoAudit
    let checkCompetition = await CompetitionDb.findOne({
      where: {
        projectId,
      },
    });

    return {
      data: checkCompetition,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete SeoAudit api by id controller**********
exports.deleteSeoAudit = async (req) => {
  try {
    let { seoAuditId } = req.body;
    let deleteSeoAudit = await SeoAudit.destroy({
      where: { id: seoAuditId },
    });

    // if SeoAudit doesn't exist
    if (deleteSeoAudit == 0) {
      return {
        data: null,
        error: "SeoAudit doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteSeoAudit,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get SeoAudit table api  controller**********

exports.getSeoAuditTable = async (req) => {
  const { projectId } = req.body;
  try {
    const getTable = await SeoAuditTable.findAll();
    const getData = await SeoAudit.findAll({ where: { projectId } });
    const tableLength = getTable.length;
    // let arr3 = getTable.map((item, i) => Object.assign({}, item, getData[i]));
    // console.log(arr3);
    // return;
    // const allData = [];
    // for (let index = 0; index < tableLength; index++) {
    //   const element = getTable[index];
    //   const allTableElement = [element];
    //   for (const ele of allTableElement) {
    //     const getData = await SeoAudit.findAll({
    //       where: { projectId },
    //     });

    //     for (const data of getData) {
    //       allData.push({
    //         checkQuestion: ele.id,
    //         grading: data.status,
    //         assign: data.assign,
    //       });
    //     }
    // console.log(getData);
    // allData.push({
    //   checkQuestion: ele.id,
    // grading: getData.grading,
    // assign: getData.assign,
    // reassign: getData.reassign,
    // date: getData.date,
    // status: getData.status,
    // timeEstimation: getData.timeEstimation,
    // time: getData.time,
    // projectId: getData.projectId,
    // taskType: getData.taskType,
    // amount: getData.amount,
    // topKey: getData.topKey,
    // note: getData.note,
    // startDate: getData.startDate,
    // dueDate: getData.dueDate,
    // createdAt: getData.createdAt,
    // updatedAt: getData.updatedAt,
    // });
    //   }
    // }
    // for (ele of getData) {
    //   for (element of getTable) {
    //     allData.push({
    //       status: ele.status,
    //     });
    //   }
    // }
    // console.log(allData);
    // const merge = [];
    // for (let i = 0; i < getTable.length; i++) {
    //   merged.push({
    //     ...getTable[i],
    //     // ...getData[i],
    //   });
    // }
    return {
      data: getData,
      error: null,
      message: "Success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
