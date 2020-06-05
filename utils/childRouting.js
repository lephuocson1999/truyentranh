const jwt               = require('./jwt');
const moment            = require('moment');
const CATEGORY_MODEL        = require('../models/category');
const STORY_MODEL        = require('../models/story');


let renderToView = async function(req, res, view, data) {
    let { token } = req.session;
    // console.log({token});
    
    // let storySession = req.session.infoStory;
    //console.log({storyArr});
    

    //let listStoryOneCategory = await PRODUCT_MODEL.listStoryOneCategory();
    let listStory = await STORY_MODEL.getList();
    //let listStoryAllCategories = await STORY_MODEL.listStoryAllCategories();
    let listCategory = await CATEGORY_MODEL.getList();
    // console.log(listCategory);
    // let listQuestion = await QUESTION_MODEL.getList();
    if(token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;
    } else {
        data.infoUser = undefined;
    }

    // if(storySession){
    //     data.storySession = storySession ;
    // }else{
    //     data.storySession = undefined;
    // }


    //data.moment         = moment;
    // data.listExam       = listExam.data;
    data.listStory    = listStory.data;
    //data.listStoryAllCategories  = listStoryAllCategories.data;
    data.listCategory       = listCategory.data;
    // data.LEVEL_TYPES    = LEVEL_TYPES;

    return res.render(view, data);
}
exports.renderToView = renderToView;