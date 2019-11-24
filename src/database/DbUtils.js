
export const convertToArray = (realmObjectsArray) => {
    let copyOfJsonArray = Array.from(realmObjectsArray);
    let jsonArray = JSON.parse(JSON.stringify(copyOfJsonArray));
    return jsonArray;
}