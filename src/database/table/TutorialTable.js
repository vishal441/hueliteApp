import {TutorialSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertOrUpdateTutorial = (array) => {
    let arr = [
        {'Tutorial_1' : false,'Tutorial_2' : false,}
    ]
    insertOrUpdateQuery(TutorialSchema.name,arr, cb => {
    console.log("updateTutorial......",cb);
   });
  
}

export const getTutorial = async() => {
    let dbRes = await getQuery(TutorialSchema.name,false);
    if(dbRes.success){
        let res = dbRes.data;
        return res;
    }
    else{
        return dbRes;
    }
}

export const deleteTutorial = () => {
    deleteSchema([TutorialSchema.name], cb => {
        console.log("deleteTutorial......",cb);
    });
}