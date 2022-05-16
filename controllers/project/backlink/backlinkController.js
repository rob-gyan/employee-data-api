let db = require("../../../models");

const Backlink = db.backlinks;
const Category = db.categories;
const Keyword = db.keywords;
const Profile = db.profiles;
const Project = db.projects;
const Type = db.types;
const Url = db.urls;
const Test = db.tests;

// **********backlink create api controller**********
exports.backlinkCreate = async (req) => {
  // console.log(req.body);
  try {
    let {
      type,
      category,
      keywordGroup,
      extraKeyword,
      profile,
      url,
      liveLinks,
      ourLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      time,
      projectId,
      status,
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

    // create backlink
    var backlinkCreate = await Backlink.create({
      type,
      category,
      keywordGroup,
      extraKeyword,
      profile,
      url,
      liveLinks,
      ourLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      time,
      projectId,
      taskType: "BACKLINK",
      projectName: projectFind.dataValues.projectName,
      status: DynamicStatus,
    });

    // find type
    let urlFind = await Url.findOne({
      where: { url },
    });
    if (urlFind == null) {
      await Url.create({ url });
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

    // for (let ele of extraKeyword) {
    //   // find keyword
    //   let keywordFind = await Keyword.findOne({
    //     where: { keyword: ele },
    //   });
    //   if (keywordFind == null) {
    //     await Keyword.create({ keyword: ele, projectId });
    //   }
    // }
    let keywordFind = await Keyword.findOne({
      where: { keyword: keywordGroup },
    });
    if (keywordFind == null) {
      await Keyword.create({ keyword: keywordGroup, projectId });
    }

    return {
      data: backlinkCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********backlink update api controller**********
exports.backlinkUpdate = async (req) => {
  try {
    let {
      backlinkId,
      projectId,
      type,
      category,
      keywordGroup,
      profile,
      url,
      liveLinks,
      ourLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      time,
      status,
      extraKeyword,
    } = req.body;
    if (backlinkId == "" || projectId == "" || !backlinkId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find backlink
    let backlinkFind = await Backlink.findOne({
      where: { id: backlinkId, projectId },
    });

    // if backlink doesn't exist
    if (backlinkFind == null) {
      return {
        data: null,
        error: "backlink doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find type
    let urlFind = await Url.findOne({
      where: { url },
    });
    if (urlFind == null) {
      await Url.create({ url });
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
    // update backlink
    var updateBacklink = await backlinkFind.update({
      type,
      category,
      keywordGroup,
      profile,
      url,
      liveLinks,
      ourLinks,
      startDate,
      dueDate,
      assignee,
      amount,
      timeEstimation,
      time,
      extraKeyword,
      status,
    });

    return {
      data: updateBacklink,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********backlink update status api controller**********
exports.backlinkUpdateStatus = async (req) => {
  try {
    let { backlinkId, projectId, status } = req.body;

    if (backlinkId == "" || projectId == "" || !backlinkId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find backlink
    let backlinkFind = await Backlink.findOne({
      where: { id: backlinkId, projectId },
    });

    // if backlink doesn't exist
    if (backlinkFind == null) {
      return {
        data: null,
        error: "backlink doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update backlink
    await backlinkFind.update({
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

// **********backlink update time api controller**********
exports.backlinkUpdateTime = async (req) => {
  try {
    let { backlinkId, time, projectId } = req.body;

    if (backlinkId == "" || projectId == "" || !backlinkId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find backlink
    let backlinkFind = await Backlink.findOne({
      where: { id: backlinkId, projectId },
    });

    // if backlink doesn't exist
    if (backlinkFind == null) {
      return {
        data: null,
        error: "backlink doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update backlink
    await backlinkFind.update({
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

// **********get all backlink api controller**********
exports.getAllBacklink = async (req) => {
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
    // find all backlink
    let allBacklink = await Backlink.findAll({ where: { projectId } });

    // get todate date
    // const today = (new Date().getTime() / 1000).toFixed(0).toString();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let ele of allBacklink) {
      let overDate = new Date(ele.dueDate);

      if (
        overDate < today &&
        ele.status != "ONHOLD" &&
        ele.status != "UNASSIGNED" &&
        ele.status != "COMPLETE" &&
        ele.status != "PENDING"
      ) {
        const backLinkStatus = await Backlink.findOne({
          where: { id: ele.id },
        });
        await backLinkStatus.update({ status: "DELAY" });
      }
    }
    return {
      data: allBacklink,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete backlink api by id controller**********
exports.deleteBacklink = async (req) => {
  try {
    let { backlinkId } = req.body;
    if (backlinkId == "" || !backlinkId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let deleteBacklink = await Backlink.destroy({
      where: { id: backlinkId },
    });

    // if backlink doesn't exist
    if (deleteBacklink == 0) {
      return {
        data: null,
        error: "backlink doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteBacklink,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId,backlinkId  **********
exports.getBacklinkTask = async (req) => {
  const { backlinkId, projectId } = req.body;
  if (backlinkId == "" || projectId == "" || !backlinkId || !projectId) {
    return {
      data: null,
      error: "something went wrong",
      message: "Failed",
      statusCode: 400,
    };
  }
  try {
    // find Backlink
    let allBacklink = await Backlink.findOne({
      where: { id: backlinkId, projectId },
    });

    const data = allBacklink;
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

// **********test backlink api by id controller**********
exports.testBacklink = async (req) => {
  try {
    let { user, json } = req.body;
    // let testBacklink = await Test.create({
    //   user,
    //   json,
    // });
    // let testBacklink = await Test.findOne({ where: { id: 3 } });
    // await testBacklink.update({ user: { name: "saini" } });
    // var ab = JSON.parse(testBacklink.dataValues.json);
    // console.log(ab.name);

    return {
      data: testBacklink,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
