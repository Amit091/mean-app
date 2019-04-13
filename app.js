const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const globalVar = require('./controller/globalVariable');

const Post = require("./models/Post");
//Database Connection
const un= globalVar.MONGO_ATLAS_UN;
const pw = globalVar.MONGO_ATLAS_PW;
const db = globalVar.MONGO_ATLAS_DB;
const timer = new Date();
const getClock = timer.getMonth()+'-'+timer.getDate()+' '+timer.getHours()+':'+timer.getMinutes()+':'+timer.getSeconds();
const uri="mongodb+srv://"+un+":"+pw+"@cluster0-xx8fg.gcp.mongodb.net/"+db+"?retryWrites=true";
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("[nodemon] "+getClock);
    console.log("[nodemon] Database Connected");
    console.log("[nodemon] MongoDB Cloud Service ");
    console.log("[nodemon] Nodemon Express Server Started ");
    // const cat = mongoose.model('cat',({name:String}));
    // const kitty = new cat({name:'tom'});
    // kitty.save();
  })
  .catch(error => console.log(`Connection Failed due to #${error}`));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images',express.static(path.join('backend/images')));

//access right middleware
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT,DELETE, OPTIONS"
  );
  next();
});

//Routinig
const post = require("./routes/post.js");
const user = require("./routes/user.js");

app.use("/api/posts/", post);
app.use("/api/user/", user);

module.exports = app;
