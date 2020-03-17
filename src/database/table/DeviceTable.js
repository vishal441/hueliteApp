import { DeviceSchema } from "../Schema"
import { insertOrUpdateQuery, getQuery, deleteSchema, deleteObject } from "../DbAction"

export const insertDevices = deviceArr => {
    insertOrUpdateQuery(DeviceSchema.name, deviceArr, cb => {})
}

export const getDeviceListFromDb = async callback => {
    let deviceRes = await getQuery(DeviceSchema.name, false)
    return deviceRes
}

export const deleteDeviceTable = () => {
    deleteSchema([DeviceSchema.name], cb => {})
}

export const deleteDevice = (filter, callback) => {
    deleteObject(DeviceSchema.name, filter, callback)
}
