import Realm from 'realm';
import {dataOptions} from './Schema';
import {convertToArray} from './DbUtils';
import {DeviceSchema, TutorialSchema} from './Schema';

export const insertOrUpdateQuery = (schemaName,array, callback) => {
    let dbResponse = {}
    Realm.open(dataOptions).then( realm => {
        try {
            array.forEach( (obj) => {
                console.log("obj------->",obj);
                realm.write(() =>{
                    realm.create(schemaName, obj, true);
                })
            });
            dbResponse.success = true;
            callback(dbResponse);
        }
        catch (e) {
            dbResponse.error = e;
            dbResponse.success = false;
            callback(dbResponse);
        }
    })
}


export const getQuery = (schemaName,filter,callback) => {    
    /** filter eg - ' id = "1" AND name BEGINSWITH "B" ' */ 
    let dbResponse = {};
    Realm.open(dataOptions).then(realm =>{
        try{
            let res = null, resArr = [];
            if(filter) {
                res = realm.objects(schemaName).filtered(filter);
            }
            else {
                res = realm.objects(schemaName);
            }            
            resArr = convertToArray(res);
            dbResponse.success = true;
            dbResponse.data = resArr;
            callback(dbResponse);
        }
        catch(e){
            dbResponse.success = false;
            dbResponse.error = e;
            callback(dbResponse);
        }
    })
}

export const deleteSchema = (delSchemaArr,callback) => {
    let dbResponse = {}
    Realm.open(dataOptions).then( realm => {
        try {
            delSchemaArr.forEach( (schemaName) => {
                realm.write(() =>{
                    let schema = realm.objects(schemaName);
                    realm.delete(schema);
                })
            });
            dbResponse.success = true;
            callback(dbResponse);
        }
        catch (e) {
            dbResponse.error = e;
            dbResponse.success = false;
            callback(dbResponse);
        }
    })
}

export const dropAllSchema = () => {
    let schemaArr = [DeviceSchema.name, TutorialSchema.name]
    deleteSchema(schemaArr);

}



