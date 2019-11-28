
import {UserInfoSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertUserInfo = () => {
    let userArr = [ {User_Id : 'test@123',
    Email_Id : "test@gmail.com",
    Phone_Version : "pie",
    Device_Id : "718@jhf8833"}]
    
    insertOrUpdateQuery(UserInfoSchema.name,userArr, cb => {
    
   });
  
}

export const getUserInfoFromDb = async(callback) => {
    getQuery(UserInfoSchema.name,false, cb => {
     
        callback (cb);
    })
}

export const deleteUserInfoTable = () => {
    deleteSchema([UserInfoSchema.name], cb => {
        
    });
}