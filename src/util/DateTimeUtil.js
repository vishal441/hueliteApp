import moment from 'moment';

const currentTimeStamp = () => {
    return +new Date
}

const addTimeIntoTimeStamp = (timeStamp, addTime, timeUnit, timeFormat) => {
    let dateFormat = "DD/MM/YYYY HH:mm:ss",
        tmUnit = timeUnit ? timeUnit : "seconds",
        addTm = addTime ? addTime : 5;
    let date = cnvrtTmStmpToDtTm(timeStamp, dateFormat);   
    let addedDtTm = moment(date,dateFormat).add(addTm,tmUnit).format(dateFormat);
    let resultDtTm = null;
    if(timeFormat){
        resultDtTm =  moment(addedDtTm, dateFormat).format(timeFormat);
    }
    else {
        resultDtTm =  moment(addedDtTm, format).unix();
    }
    return resultDtTm;
}

const cnvrtTmStmpToDtTm = (timeStamp, dtTmFormat) => {
    let dateFormat = dtTmFormat ? dtTmFormat : "MM/DD/YYYY HH:mm:ss";
    let dateString = null;
    if(timeStamp){
        dateString = moment.unix(timeStamp).format(dateFormat);
    }
    else{
        dateString = moment().format(dateFormat);
    }
    return dateString;
     
}

export {
    currentTimeStamp,
    cnvrtTmStmpToDtTm,
    addTimeIntoTimeStamp
}