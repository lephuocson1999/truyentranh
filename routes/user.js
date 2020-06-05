let route = require('express').Router();
const  USER_MODEL = require('../models/user');
let {renderToView} = require('../utils/childRouting');
let ObjectID = require('mongoose').Types.ObjectId;

route.get('/danh-sach-user', async (req, res) => {
    var listUser = await USER_MODEL.getList();
    res.json({listUser: listUser.data});

})

route.post('/them-user', async (req, res) =>{
    let{username, name, password, phone, age, sex} = req.body;
    console.log(username, name, password, phone, age, sex);
    var addUser = await USER_MODEL.register(username, name, password, phone, age, sex);
    res.json({addUser});
})

route.post('/sua-user', async (req, res) =>{
    let {id} = req.query;
    let{username,name,password,phone,age} = req.body;
    console.log(id, username, name, password, phone, age);
    var updateUser = await USER_MODEL.update({id, username,name,password,phone,age});
    res.json({updateUser});
})

route.get('/login',async (req, res) => {
    res.render('dashboards/pages/login');
})

route.post('/login',async (req, res) => {
     //req.session.isLogin = true;
    let { username, password } = req.body;
    console.log({username, password });
    
    let infoUser = await USER_MODEL.signIn(username, password);
    console.log({infoUser});
    
    if(infoUser.error)
        return res.json(infoUser);
    
     // let infoUserData = infoUser.data;
     // console.log({infoUserData});
    
     // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    req.session.user = infoUser.data; 
    renderToView(req, res, 'dashboards/pages/dashboards', { })
})



module.exports = route;