var express = require("express");
var userController = require("../../controllers/user/userController");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../../config");
var router = express.Router();
const auth = require("../../middleware/auth");

// *********signup api*********
router.post(
  "/signup",
  check("user", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    try {
      let userRegister = await userController.signup(req);
      let code = userRegister.statusCode;
      delete userRegister.statusCode;
      console.log(code);
      res.status(code).send(userRegister);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// *********login api**********
router.post(
  "/login",
  check("user", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    try {
      let userLogin = await userController.login(req);
      if (userLogin.data != null) {
        // payload create
        const payload = {
          user: userLogin.data.dataValues.user,
          role: userLogin.data.dataValues.role,
          id: userLogin.data.dataValues.id,
        };

        // create jwt token
        jwt.sign(payload, config.jwt, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.send({
            message: "SUCCESS",
            token,
            user: payload.user,
            userId: payload.id,
            twoFA: userLogin.data.dataValues.twoFA,
            statusCode: 200,
          });
          return;
        });
      } else {
        let code = userLogin.statusCode;
        res.status(code).send(userLogin);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
router.get("/getAllUser", auth, async (req, res) => {
  try {
    let getAllUser = await userController.getAllUser(req);
    res.status(200).send(getAllUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/twofaVerify", auth, async (req, res) => {
  try {
    let deleteProject = await userController.twofaVerify(req);
    let code = deleteProject.statusCode;
    console.log(code);
    res.status(code).send(deleteProject);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/twofacreate", auth, async (req, res) => {
  try {
    let deleteProject = await userController.twofaCreate(req);
    let code = deleteProject.statusCode;
    console.log(code);
    res.status(code).send(deleteProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// check twoFA
router.post("/checkTwoFA", auth, async (req, res) => {
  try {
    let checkTwoFA = await userController.checkTwoFA(req);
    let code = checkTwoFA.statusCode;
    delete checkTwoFA.statusCode;
    console.log(code);
    res.status(code).send(checkTwoFA);
  } catch (error) {
    res.status(500).send(error);
  }
});

// make checktwoFA false
router.post("/makeFalseCheckTwoFA", auth, async (req, res) => {
  try {
    let makeFalseCheckTwoFA = await userController.makeFalseCheckTwoFA(req);
    let code = makeFalseCheckTwoFA.statusCode;
    delete makeFalseCheckTwoFA.statusCode;
    console.log(code);
    res.status(code).send(makeFalseCheckTwoFA);
  } catch (error) {
    res.status(500).send(error);
  }
});

// verify token with user
router.post("/verifyToken", auth, async (req, res) => {
  try {
    let verifyToken = await userController.verifyToken(req);
    let code = verifyToken.statusCode;
    delete verifyToken.statusCode;
    console.log(code);
    res.status(code).send(verifyToken);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
