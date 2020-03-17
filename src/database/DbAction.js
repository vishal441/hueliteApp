import Realm from "realm"
import Schema, { dataOptions } from "./Schema"
import { convertToArray } from "./DbUtils"
import { DeviceSchema, TutorialSchema } from "./Schema"

export const insertOrUpdateQuery = (schemaName, array, callback) => {
    let dbResponse = {}
    Realm.open(dataOptions).then(realm => {
        try {
            array.forEach(obj => {
                realm.write(() => {
                    realm.create(schemaName, obj, true)
                })
            })
            dbResponse.success = true
            callback(dbResponse)
        } catch (e) {
            dbResponse.error = e
            dbResponse.success = false
            callback(dbResponse)
        }
    })
}

export const getQuery = async (schemaName, filter) => {
    /** filter eg - ' id = "1" AND name BEGINSWITH "B" ' */
    let dbResponse = {}
    let realm = await Realm.open(dataOptions)
    try {
        let res = null,
            resArr = []
        if (filter) {
            res = realm.objects(schemaName).filtered(filter)
        } else {
            res = realm.objects(schemaName)
        }
        resArr = convertToArray(res)
        dbResponse.success = true
        dbResponse.data = resArr
        return dbResponse
    } catch (e) {
        dbResponse.success = false
        dbResponse.error = e
        return dbResponse
    }
}

export const deleteSchema = (delSchemaArr, callback) => {
    console.log("Deleting Schema")
    let dbResponse = {}
    Realm.open(dataOptions).then(realm => {
        try {
            delSchemaArr.forEach(schemaName => {
                realm.write(() => {
                    let schema = realm.objects(schemaName)
                    realm.delete(schema)
                })
            })
            dbResponse.success = true
            callback(dbResponse)
        } catch (e) {
            dbResponse.error = e
            dbResponse.success = false
            callback(dbResponse)
        }
    })
}

export const deleteObject = (SchemaName, filter, callback) => {
    let dbResponse = {}
    Realm.open(dataOptions).then(realm => {
        try {
            realm.write(() => {
                let item = realm.objects("Device").filtered(filter)
                realm.delete(item)
            })

            dbResponse.success = true
            callback(dbResponse)
        } catch (e) {
            dbResponse.error = e
            dbResponse.success = false
            callback(dbResponse)
        }
    })
}

export const dropAllSchema = () => {
    let schemaArr = [DeviceSchema.name, TutorialSchema.name]
    deleteSchema(schemaArr)
}
