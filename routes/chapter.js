let route = require('express').Router();
const  CHAPTER_MODEL = require('../models/chapter');

route.get('/danh-sach-chapter', async (req, res) => {
    var listChapter = await CHAPTER_MODEL.getList();
    res.json({listChapter: listChapter.data});

})
route.post('/them-chapter', async (req, res) =>{
    let{chaptername, story, avatar, gallery} = req.body;
    console.log(chaptername, story, avatar, gallery);
    var addChapter = await CHAPTER_MODEL.insert(chaptername, story, avatar, gallery);
    res.json({addChapter});
})
 route.post('/sua-chapter', async (req, res) =>{
    let {id} = req.query;
    let{chaptername, author, status, category, view} = req.body;
    console.log(id, chaptername, author, status, category, view);
    var updateChapter = await CHAPTER_MODEL.update({id, chaptername, author, status, category, view});
    res.json({updateChapter});
 })

module.exports = route;