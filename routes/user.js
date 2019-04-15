const express = require("express");
const router = express.Router();
const UserController = require('./../controller/userController');

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginuser);

router.get("/all",UserController.getAllUser);

module.exports = router;
