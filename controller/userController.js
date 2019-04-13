const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const globalVar = require('./globalVariable');
const tokentxt = globalVar.JWT_KEY;
exports.createUser = (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(userExist=>{
    if(userExist)
    {
      console.log('Email existed');
       res.status(500).json({
        message: "User Email already Exists!"
      });
    } else{


  bcrypt.hash(req.body.password, 10).then(hash => {
       const user = new User({
      email: req.body.email,
      password: hash
    });

    user
      .save()
      .then(result => {
        console.log("User Saved");
        console.log(result);
        res.status(201).json({
          message: "User Created",
          result: user
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Invalid Authentcation Credentials"
        });
      });
  });
}
});
};

exports.loginuser = (req, res, next) => {
  console.log("Logging ....");
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email is not Register!!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Email or Password not Correct"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        tokentxt,
        { expiresIn: "1h" }
      );
      console.log("Logged In");
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid Authentcation Credentials"
      });
    });
};
