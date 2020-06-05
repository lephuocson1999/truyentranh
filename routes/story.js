let route = require('express').Router();
const  STORY_MODEL = require('../models/story');

route.get('/danh-sach-story', async (req, res) => {
    var listStory = await STORY_MODEL.getList();
    res.json({listStory: listStory.data});

})
route.post('/them-story', async (req, res) =>{
    let{storyname, category, author, avatar, gallery, hot, summary} = req.body;
    console.log(storyname, category, author, avatar, gallery, hot, summary);
    var addStory = await STORY_MODEL.insert(storyname, category, author, avatar, gallery, hot, summary);
    res.json({addStory});
})
 route.post('/sua-story', async (req, res) =>{
    let {id} = req.query;
    let{storyname, category, author, avatar, gallery} = req.body;
    console.log(id, storyname, category, author, avatar, gallery);
    var updateStory = await STORY_MODEL.update({id, storyname, category, author, avatar, gallery});
    res.json({updateStory});
 })
 
module.exports = route;