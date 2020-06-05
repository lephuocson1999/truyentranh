var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    story: [{
        type: Schema.Types.ObjectId,
        ref:'story',
        default: []
    }]
});
let TAG_COLL = mongoose.model('tag', tagSchema);
module.exports = TAG_COLL;
