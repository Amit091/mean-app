const express = require("express");
const router = express.Router();
const UserController = require('./../controller/userController');

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginuser);

module.exports = router;
