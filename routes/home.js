let route = require('express').Router();
const STORY_MODEL = require('../models/story')
let {renderToView} = require('../utils/childRouting')

route.get('/',(req, res) => {
    renderToView(req, res, 'pages/home',{})
})



route.post('/truyen-tranh', async (req, res) => {
    

})

module.exports = route;