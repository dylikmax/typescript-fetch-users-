export function getData(dataType: string, filterCondition: string) {
  return fetch(
    `https://jsonplaceholder.typicode.com/${dataType}${filterCondition}`
  )
    .then((response) => response.json())
    .then((list) => {
      return list;
    });
}
