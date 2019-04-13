const express = require('express');
const router = express.Router();

const userAuth = require('./../middleware/check-auth');
const PostController = require('../controller/postController');
const multer = require('./../middleware/multer');

//configuring multer


router.get("/",PostController.getAllPost);

router.post("/", userAuth,multer,PostController.addPost);

router.put('/edit/:id', userAuth, multer,PostController.updatePost);

router.delete("/:id", userAuth,PostController.deletePost);

router.get('/edit/:id', userAuth,PostController.getPost);


module.exports = router;
