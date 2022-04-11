let db = require("../../models");
let config = require("../../config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
var base32 = require("hi-base32");

const User = db.users;

// **********signup api controller**********
exports.signup = async (req) => {
  try {
    // check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        error: errors.array(),
        message: "FAILED",
        statusCode: 400,
      };
    }

    let { user, password, role } = req.body;

    // if user already exist
    var userExists = await User.findOne({
      where: { user: user },
    });
    if (userExists) {
      return {
        data: null,
        error: "user already exists",
        message: "Failed",
        statusCode: 400,
      };
    }

    // create salt hash
    const salt = "created strong hash";

    // password hash
    password = md5(`${user} + ${password} + ${salt} + ${role}`);
    var userExists = await User.create({
      user: user,
      password: password,
      role: role,
    });

    return {
      data: userExists,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAllUser = async (req) => {
  try {
    var allUser = await User.findAll();
    const allAssignee = [];
    allUser.map((i) => {
      allAssignee.push({
        id: i.dataValues.id,
        assignee: i.dataValues.user,
      });
    });
    return {
      data: allAssignee,
      error: null,
      message: "success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********login api controller**********
exports.login = async (req) => {
  try {
    // check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        error: errors.array(),
        message: "FAILED",
        statusCode: 400,
      };
    }

    let { user, password } = req.body;

    var userExists = await User.findOne({
      where: { user: user },
    });
    const role = userExists.dataValues.role;

    // if user doesnt exist
    if (userExists == null) {
      return {
        data: null,
        error: "user doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // create salt hash
    const salt = "created strong hash";

    // if user enter uppercase letter
    user = user.toLowerCase();

    // current hash created
    const currentHash = md5(`${user} + ${password} + ${salt} + ${role}`);

    // user old hash
    const oldHash = await userExists.dataValues.password;

    // match password hash
    const checkHash = currentHash == oldHash;
    if (!checkHash) {
      return {
        data: null,
        error: "error",
        message: "Invalid Credentials",
        statusCode: 400,
      };
    }

    return {
      data: userExists,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********twofa verify api controller**********
exports.twofaVerify = async (req) => {
  try {
    const { user, token } = req.body;

    let userToken = token;

    var orignalEmail = user;
    var secret = "DFGRTGKTHGJDRTDLITHFJHGSDKFHG";
    const email = user;
    const finalsecret = base32.encode(email + secret);
    const base32secret = base32.decode(finalsecret);

    let verified = speakeasy.totp.verify({
      secret: base32secret,
      encoding: "ascii",
      token: userToken,
    });

    if (verified) {
      // find user
      let changeTwoFA = await User.findOne({
        where: { user: req.body.user },
      });
      // update twoFA
      await changeTwoFA.update({
        twoFA: true,
      });
    }

    return {
      data: verified,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ********** check twofa verify api controller**********
exports.checkTwoFA = async (req) => {
  const { user } = req.body;
  var userExists = await User.findOne({
    where: { user: user },
  });
  return {
    data: userExists.dataValues.verifyTwoFA,
    twoFA: userExists.dataValues.twoFA,
    error: null,
    message: "success",
    statusCode: 200,
  };
};

// **********  twofa verify make false api controller**********
exports.makeFalseCheckTwoFA = async (req) => {
  const { user } = req.body;
  var userExists = await User.findOne({
    where: { user: user },
  });
  await userExists.update({
    verifyTwoFA: false,
  });
  return {
    data: userExists.dataValues.verifyTwoFA,
    error: null,
    message: "success",
    statusCode: 200,
  };
};

// **********twofa verify api controller**********
exports.twofaCreate = async (req) => {
  try {
    const { user } = req.body;

    // create 2fa
    var orignalEmail = user;
    var secret = config.twoFASecret;
    const email = user;
    const finalsecret = base32.encode(email + secret);
    const site = "employeeData(" + orignalEmail + ")";
    var otpauth_url = "otpauth://totp/" + site + "?secret=" + finalsecret + "";

    const urlPath = await qrcode.toDataURL(otpauth_url);

    return {
      data: urlPath,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// **********token verify api controller**********
exports.verifyToken = async (req) => {
  const { token, user } = req.body;
  // Verify token
  try {
    const isVerify = await jwt.verify(token, config.jwt);
    const checkUser = isVerify.user == user;

    if (!checkUser) {
      return {
        data: false,
        error: null,
        message: "unauthorized user",
        statusCode: 401,
      };
    } else {
      if (isVerify) {
        return {
          data: true,
          error: null,
          message: "Verified",
          statusCode: 200,
        };
      } else {
        return {
          data: false,
          error: null,
          message: "unauthorized user",
          statusCode: 401,
        };
      }
    }
  } catch (err) {
    return {
      data: false,
      error: null,
      message: "unauthorized token",
      statusCode: 401,
    };
  }
};
