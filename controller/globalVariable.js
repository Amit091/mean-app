module.exports = {
  MONGO_ATLAS_UN: "amit",
  MONGO_ATLAS_PW: "amit1234",
  MONGO_ATLAS_DB: "meanDB",
  JWT_KEY: "I_Love_My_Country_Amit_Dhoju_rosy"
};

exports.getClock=()=>{
  const timer = new Date();
const getClock = timer.getMonth()+'/'+timer.getDate()+' '+timer.getHours()+':'+timer.getMinutes()+':'+timer.getSeconds();
}
