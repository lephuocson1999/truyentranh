let USER_COLL = require('../database/user');
let ObjectID = require('mongoose').Types.ObjectId;

const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../utils/jwt');

module.exports = class USER {
    static insert(username, name, password, phone, age, sex){
        return new Promise(async resolve => {
            try {
                console.log({username, name, password, phone, age, sex});
                
                let infoUser = await USER_COLL.findOne({username});
                if (infoUser) {
                    return resolve({error: true, message: 'exist'})
                }
                let newUser = new USER_COLL({username, name, password, phone, age, sex});
                let infoUserAfterInsert = await newUser.save();
                if(!infoUserAfterInsert){
                    return resolve({error: true, message:'cannot_insert_user'});
                }               
                return resolve({error: false, message: 'insert_success'});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static register(username, name, password, phone, age, sex){
        return new Promise(async resolve => {
            try{
                let checkExist = await USER_COLL.findOne({username});
                console.log({checkExist});
                if(checkExist){
                    return resolve({error: true, message: 'admin_existed'})
                }

                let hashPass = await hash(password,8);
                console.log({hashPass});

                let newUser = new USER_COLL({username, name, password: hashPass, phone, age, sex})
                console.log({newUser});

                let infoUser = await newUser.save();
                
                if(!infoUser) return resolve({error: true, message:'cannot_insert'});
                return resolve({error: false, message:'insert_success',data: infoUser});
            }catch(error){
                return resolve({error: true, message: error.message})
            }
        });
    }

    static signIn(username, password){
        return new Promise(async resolve => {
            try {
                let infoUser = await USER_COLL.findOne({username});

                if(!infoUser){

                    return resolve({ error: true, message: 'admin_not_exist' });
                }

                let passwordInfo = infoUser.password

                const checkPass = await compare(password, passwordInfo);
                console.log({checkPass});

                if(!checkPass){
                    return resolve({ error: true, message: 'password_not_exist' });
                }
                await delete infoUser.password;
                let token = await sign({data:infoUser});
                
                return resolve({ error: false, data: { infoUser, token } });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList(){
        return new Promise(async resolve => {
            try {
                let listUser = await USER_COLL.find({});
                if (!listUser){
                    return resolve({error: true, message: 'cannot_get_listUser'});
                }
                return resolve({error: false, message: 'get_list_user_success', data: listUser});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfo(id){
        return new Promise(async resolve => {
            try {
                let infoUser = await USER_COLL.findById(id);
                if(!infoUser){
                    return resolve({error: true, message:'not_found_infoUser'});
                }
                return resolve({error: false, message:'get_info_success'});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    static update({id, username, name, password, phone, age, sex}) {
        return new Promise(async resolve => {
            try {
                 console.log(id, username, name, password, phone, age);
                
                if(!ObjectID.isValid(id)){
                    return resolve({error: true, message:'params_invalid'});
                }
                let listUser = await USER_COLL.findByIdAndUpdate(id,{
                    username, name, password, phone, age, sex
                }
                ,{
                    new: true
                });
                console.log({listUser});
                
                if(!listUser){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listUser});


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove(id){
        return new Promise(async resolve => {
            try {
                let listUserForRemove = await USER_COLL.findByIdAndDelete(id);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}