let route = require('express').Router();
const CATEGORY_MODEL =  require('../models/category');
const STORY_MODEL =  require('../models/story');
const CHAPTER_MODEL =  require('../models/chapter');
let {renderToView} = require('../utils/childRouting');


route.post('/them-danh-muc', async(req, res) => {
    let {title, description} = req.body;
    console.log({title, description});

    let infoProductForInsert = await CATEGORY_MODEL.insert(title, description);
    console.log({infoProductForInsert});
    
    res.json({infoProductForInsert})
    
})

route.get('/truyen-tranh',async (req, res) => {
    let {id} = req.query;
    console.log({id});
    
    let infoStory = await STORY_MODEL.getInfo(id);
    console.log({infoStory});

    renderToView(req, res, 'pages/story-detail',{infoStory: infoStory.data})
})

route.get('/',async (req, res) => {
    let {id} = req.query;
    console.log({id});
    let infoCategory = await CATEGORY_MODEL.getInfo(id) ;
    // let infoProduct = await PRODUCT_MODEL.getInfo(productID);
    renderToView(req, res, 'pages/all-category',{infoCategory: infoCategory.data})
})

route.get('/truyen-tranh/chapter',async (req, res) => {
    let {id} = req.query;
    console.log({id});

    let infoChapter = await CHAPTER_MODEL.getInfo(id);
    console.log({infoChapter});
    
    renderToView(req, res, 'pages/chapter',{infoChapter: infoChapter.data})
})

module.exports = route;
