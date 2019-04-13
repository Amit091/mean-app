const mongoose = require('mongoose');
const schema = mongoose.Schema;
const postSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imagePath:{
        type:String,
        required:true
    },
    creator:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
});

module.exports = mongoose.model('post',postSchema);
