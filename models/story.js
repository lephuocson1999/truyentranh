let STORY_COLL = require('../database/story');
let CATEGORY_COLL = require('../database/category');
let ObjectID = require('mongoose').Types.ObjectId;

module.exports = class STORY {
    static insert(storyname, category,  author, avatar, gallery, hot, summary){
        return new Promise(async resolve => {
            try {
                console.log({storyname, category, author, avatar, gallery, hot, summary});
                
                let infoStory = await STORY_COLL.findOne({storyname});
                if (infoStory) {
                    return resolve({error: true, message: 'exist'})
                }
                let newStory = new STORY_COLL({storyname, category, author, avatar, gallery, hot, summary});
                let infoStoryAfterInsert = await newStory.save();
                if(!infoStoryAfterInsert){
                    return resolve({error: true, message:'cannot_insert_story'});
                } 
                let {_id: storyID} = infoStoryAfterInsert;
                let infoStoryAfterUpdate = await CATEGORY_COLL.findByIdAndUpdate(category,{
                    $addToSet: {
                        story: storyID
                    }
                        
                });
                if(!infoStoryAfterUpdate){
                    return resolve({error: true, message: 'cannot_update_category'})
                }



                return resolve({error: false, message: 'insert_success'});

            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getList(){
        return new Promise(async resolve => {
            try {
                let listStory = await STORY_COLL.find({}).sort({createAt: -1});
                if (!listStory){
                    return resolve({error: true, message: 'cannot_get_listStory'});
                }
                return resolve({error: false, message: 'get_list_story_success', data: listStory});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfo(id){
        return new Promise(async resolve => {
            try {
                let infoStory = await STORY_COLL.findById(id)
                .populate('category')
                .populate('tag');
                if(!infoStory){
                    return resolve({error: true, message:'not_found_infoStory'});
                }
                return resolve({error: false, message:'get_info_success', data: infoStory});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    static update({id, storyname, category, author, avatar, gallery}) {
        return new Promise(async resolve => {
            try {
                 console.log(storyname, category, author, avatar, gallery);
                
                if(!ObjectID.isValid(id)){
                    return resolve({error: true, message:'params_invalid'});
                }
                let listStory = await STORY_COLL.findByIdAndUpdate(id,{
                    storyname, category, author, avatar, gallery
                }
                ,{
                    new: true
                });
                console.log({listStory});
                
                if(!listStory){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listStory});


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove(id){
        return new Promise(async resolve => {
            try {
                let listStoryForRemove = await STORY_COLL.findByIdAndDelete(id);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}