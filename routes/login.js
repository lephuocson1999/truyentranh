let route = require('express').Router();
const USER_MODEL =  require('../models/user');
let {renderToView} = require('../utils/childRouting');

route.get('/',async (req, res) => {
    renderToView(req, res, 'dashboards/pages/login',{});
})

module.exports = route;
