const jwt = require('jsonwebtoken');
const globalVar = require('./../controller/globalVariable');
const tokentxt = globalVar.JWT_KEY;
module.exports = (req, res, next) => {
  console.log('authenticating');
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,tokentxt);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    };
    console.log('***************************************');
    console.log('****' + req.headers + '******');
    console.log(token);
    console.log(jwt);
    console.log(decodedToken);
    console.log('***************************************');
    next();
  } catch (error) {
    res.status(401).json({message : 'Invalid Authentcation Credentials'});
  }
};
