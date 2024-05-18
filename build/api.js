export function getData(dataType, filterCondition) {
    return fetch(`https://jsonplaceholder.typicode.com/${dataType}${filterCondition}`)
        .then((response) => response.json())
        .then((list) => {
        return list;
    });
}
