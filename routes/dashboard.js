let route = require('express').Router();
const CATEGORY_MODEL =  require('../models/category');
const STORY_MODEL =  require('../models/story');
const CHAPTER_MODEL =  require('../models/chapter');
let {renderToView} = require('../utils/childRouting');

route.get('/',async (req, res) => {
    let a = req.session;
    console.log({a});
    
    renderToView(req, res, 'dashboards/pages/dashboards',{});
})

module.exports = route;
