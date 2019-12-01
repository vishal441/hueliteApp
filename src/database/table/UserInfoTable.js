
import {UserInfoSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertUserInfo = (userInfo) => { 
    insertOrUpdateQuery(UserInfoSchema.name,userInfo, cb => {
       
   });
  
}

export const getUserInfoFromDb = async(callback) => {
    getQuery(UserInfoSchema.name,false, cb => {
        if(cb.success){
            callback (cb.data[0]);
        }
        else{
            callback(false);
        }
    })
}

export const deleteUserInfoTable = () => {
    deleteSchema([UserInfoSchema.name], cb => {
        
    });
}

