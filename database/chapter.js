var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chapterSchema = new Schema({

    chaptername: String
    ,
    story: [{
        type: Schema.Types.ObjectId,
        ref: 'story'}],
    avatar: String,
    gallery: String
});

let CHAPTER_COLL  = mongoose.model('chapter',chapterSchema);
module.exports = CHAPTER_COLL;