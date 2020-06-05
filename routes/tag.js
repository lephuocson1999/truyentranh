let route = require('express').Router();
const TAG_MODEL =  require('../models/tag');
const STORY_MODEL =  require('../models/story');
let {renderToView} = require('../utils/childRouting');


route.post('/them-tag', async(req, res) => {
    let {title, story} = req.body;
    console.log({title, story});

    let infoProductForInsert = await TAG_MODEL.insert(title, story);
    console.log({infoProductForInsert});
    
    res.json({infoProductForInsert})
})

module.exports = route;
