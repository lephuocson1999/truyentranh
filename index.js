
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let uri = 'mongodb://localhost:27017/TruyenTranh';
let {renderToView} = require('./utils/childRouting');

// ROUTE
// const USER_ROUTE = require('./routes/user');
// const STORY_ROUTE = require('./routes/story');
const HOME_ROUTE = require('./routes/home');
const CATEGORY_ROUTE = require('./routes/category');
const STORY_ROUTE = require('./routes/story');
const CHAPTER_ROUTE = require('./routes/chapter');
const TAG_ROUTE = require('./routes/tag');
const DASHBOARD_ROUTE = require('./routes/dashboard');
const USER_ROUTE = require('./routes/user');
// MODEL
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views/');
    
app.use('/home',HOME_ROUTE);
app.use('/danh-muc',CATEGORY_ROUTE);
app.use('/story',STORY_ROUTE);
app.use('/chapter',CHAPTER_ROUTE);
app.use('/tag',TAG_ROUTE);
app.use('/dashboard',DASHBOARD_ROUTE);
app.use('/user',USER_ROUTE);

app.get('/', (req, res)=> {
    renderToView(req, res, 'pages/home',{})
})

mongoose.connect(uri);
mongoose.connection.once('open',() =>{
    console.log('mongodb connected');
    app.listen(4000,() => console.log('server connected at port 3000'))
})
