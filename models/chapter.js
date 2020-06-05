let CHAPTER_COLL = require('../database/chapter');
let STORY_COLL = require('../database/story');
let ObjectID = require('mongoose').Types.ObjectId;

const { hash, compare } = require('bcrypt');

module.exports = class CHAPTER {
    static insert(chaptername, story, avatar, gallery){
        return new Promise(async resolve => {
            try {
                // console.log({chaptername, story, avatar, gallery});
                
                // let infoUser = await CHAPTER_COLL.findOne({chaptername});
                // if (infoUser) {
                //     return resolve({error: true, message: 'exist'})
                // }
                let newChapter = new CHAPTER_COLL({chaptername, story, avatar, gallery});
                let infoChapterAfterInsert = await newChapter.save();
                if(!infoChapterAfterInsert){
                    return resolve({error: true, message:'cannot_insert_chapter'});
                }           
                
                let {_id: chapterID} = infoChapterAfterInsert;
                let infoStoryAfterUpdate = await STORY_COLL.findByIdAndUpdate(story,{
                    $addToSet: {
                        chapter: chapterID
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
                let listChapter = await CHAPTER_COLL.find({});
                if (!listChapter){
                    return resolve({error: true, message: 'cannot_get_listChapter'});
                }
                return resolve({error: false, message: 'get_list_chapter_success', data: listChapter});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfo(id){
        return new Promise(async resolve => {
            try {
                let infoChapter = await  CHAPTER_COLL.findById(id).populate('story');
                if(!infoChapter){
                    return resolve({error: true, message:'not_found_infoChapter'});
                }
                return resolve({error: false, message:'get_info_success', data: infoChapter});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    static update({id, chaptername, author, status, category, view}) {
        return new Promise(async resolve => {
            try {
                 console.log(id, chaptername, author, status, category, view);
                
                if(!ObjectID.isValid(id)){
                    return resolve({error: true, message:'params_invalid'});
                }
                let listChapter = await USER_COLL.findByIdAndUpdate(id,{
                    chaptername, author, status, category, view
                }
                ,{
                    new: true
                });
                console.log({listChapter});
                
                if(!listChapter){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listChapter});


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove(id){
        return new Promise(async resolve => {
            try {
                let listChapterForRemove = await CHAPTER_COLL.findByIdAndDelete(id);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}