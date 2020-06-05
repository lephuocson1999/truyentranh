var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({

    storyname:  {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    chapter:[{
        type: Schema.Types.ObjectId,
        ref: 'chapter'
    }],
    author: String,
    avatar: String,
    gallery: String,
    hot: {
        type: Number,
        default: 0
    },
    summary: String,
    tag:[{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    createAt: {
        type:Date,
        default: Date.now
    }
});

let STORY_COLL  = mongoose.model('story',storySchema);
module.exports = STORY_COLL;