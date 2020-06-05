var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    story: [{
        type: Schema.Types.ObjectId,
        ref:'story',
        default: []
    }]
});
let CATEGORY_COLL = mongoose.model('category', categorySchema);
module.exports = CATEGORY_COLL;
