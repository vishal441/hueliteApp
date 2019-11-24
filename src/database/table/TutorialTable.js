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

export const getTutorial = (callback) => {

    getQuery(TutorialSchema.name,false, cb => {
        console.log("getTutorial......",cb);
        if(cb.success){
            let res = cb.data;
            callback(res);
        }
        else{
            callback(cb);
        }
    })
}

export const deleteTutorial = () => {
    deleteSchema([TutorialSchema.name], cb => {
        console.log("deleteTutorial......",cb);
    });
}