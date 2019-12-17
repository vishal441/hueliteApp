import moment from 'moment';

const currentTimeStamp = () => {
    return  moment().unix();
}

const addTimeIntoTimeStamp = (timeStamp, addTime, timeUnit, timeFormat) => {
    let dateFormat = "DD/MM/YYYY HH:mm:ss",
        tmUnit = timeUnit ? timeUnit : "seconds",
        addTm = addTime ? addTime : 5;
    let date = cnvrtTmStmpToDtTm(timeStamp, dateFormat);
    let addedDtTm = moment(date, dateFormat).add(addTm, tmUnit).format(dateFormat);
    let resultDtTm = null;
    if (timeFormat) {
        resultDtTm = moment(addedDtTm, dateFormat).format(timeFormat);
    }
    else {
        resultDtTm = moment(addedDtTm, dateFormat).unix();
    }
    return resultDtTm;
}

const cnvrtTmStmpToDtTm = (timeStamp, dtTmFormat) => {
    let dateFormat = dtTmFormat ? dtTmFormat : "MM/DD/YYYY HH:mm:ss";
    let dateString = null;
    if (timeStamp) {
        let dt = new Date(timeStamp);
        dateString = moment(dt).format(dateFormat);
    }
    else {
        dateString = moment().format(dateFormat);
    }
    return dateString;

}

const findDiffBtTmStmp = (timeStamp1, timeStamp2, timeUnit) => {
    let diff = 0,
        tmUnit = timeUnit ? timeUnit : "seconds";
      
    if (timeStamp1 && timeStamp2) {
        let dt1 = moment.unix(timeStamp1);
        let dt2 = moment.unix(timeStamp2);
        diff = dt2.diff(dt1, tmUnit);
    }
    return diff;
}

export {
    currentTimeStamp,
    cnvrtTmStmpToDtTm,
    addTimeIntoTimeStamp,
    findDiffBtTmStmp
}