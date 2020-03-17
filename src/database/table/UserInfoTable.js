import { UserInfoSchema } from "../Schema"
import { insertOrUpdateQuery, getQuery, deleteSchema } from "../DbAction"

export const insertUserInfo = userInfo => {
    insertOrUpdateQuery(UserInfoSchema.name, userInfo, cb => {})
}

export const getUserInfoFromDb = async () => {
    let dbRes = await getQuery(UserInfoSchema.name, false)
    if (dbRes.success) {
        return dbRes.data[0]
    } else {
        return false
    }
}

export const deleteUserInfoTable = () => {
    deleteSchema([UserInfoSchema.name], cb => {})
}
