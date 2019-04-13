const Post = require('./../models/Post');
exports.getAllPost =  (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  //console.log(req.query);
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  console.log('Getting all the posts');
  postQuery.find()
    .then(posts => {
      fetchedPosts = posts;
      return Post.count();
    }).then(count => {
      res.status(200).json({
        message: "Data Fetch form server",
        posts: fetchedPosts,
        maxPost: count
      });
    })
    .catch(err => {
     res.status(500).json({
       message:'Error while fetching server data'
     });
    });
};

exports.addPost= (req, res, next) => {
  console.log('Adding post');
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  console.log(post);
  post.save().then(savedPost => {
    res.status(201).json({
      message: "Post added Successfully",
      post: {
        ...savedPost,
        id: savedPost._id
      }
    });
  })
    .catch(err => {
      res.status(500).json({
        message:'Post Creating Failed!!'
      });
    });
};

exports.updatePost =  (req, res, next) => {
  console.log('Updating the post');
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
    //  console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update Successful !" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }).catch(err => {
      res.status(500).json({
        message:'Updating Post Failed'
      });
    });
};

exports.deletePost=  (req, res, next) => {
  console.log('Deleting  the posts');
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId})
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Post Deletion Successful !" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message:'Error while deleting the post'
      });
    });
};

exports.getPost= (req, res, next) => {
  console.log('Getting Data');
  Post.findById(req.params.id).then(post => {
    //  console.log(post);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post Not Found !!" });
    }
  }).catch(err=>{
    res.status(500).json({
      message:'Error while fetching form server data'
    });
  });
};
