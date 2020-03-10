import moment from "moment"

const getCurrentTimeStamp = () => {
    let timestamp = new Date().getTime()
    return Math.round(timestamp)
}

const addTimeIntoTimeStamp = (timeStamp, addTime, timeUnit, timeFormat) => {
    let dateFormat = "DD/MM/YYYY HH:mm:ss",
        tmUnit = timeUnit ? timeUnit : "seconds",
        addTm = addTime ? addTime : 5
    let date = cnvrtTmStmpToDtTm(timeStamp, dateFormat)
    let addedDtTm = moment(date, dateFormat)
        .add(addTm, tmUnit)
        .format(dateFormat)
    let resultDtTm = null
    if (timeFormat) {
        resultDtTm = moment(addedDtTm, dateFormat).format(timeFormat)
    } else {
        resultDtTm = moment(addedDtTm, dateFormat).unix()
    }
    return resultDtTm
}

const cnvrtTmStmpToDtTm = (timeStamp, dtTmFormat) => {
    let dateFormat = dtTmFormat ? dtTmFormat : "MM/DD/YYYY HH:mm:ss"
    let dateString = null
    if (timeStamp) {
        let dt = new Date(timeStamp)
        dateString = moment(dt).format(dateFormat)
    } else {
        dateString = moment().format(dateFormat)
    }
    return dateString
}

const findTimestampDiffInSec = (timeStamp1, timeStamp2) => {
    let diff = 0
    if (timeStamp1 && timeStamp2) {
        diff = timeStamp2 - timeStamp1
    }
    return diff
}

export { getCurrentTimeStamp, cnvrtTmStmpToDtTm, addTimeIntoTimeStamp, findTimestampDiffInSec }
