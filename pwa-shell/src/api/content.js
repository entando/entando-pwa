export const getContentList = type => fetch(`https://jsonplaceholder.typicode.com/${type}`);

export const getContentDetail = (type, id) => fetch(`https://jsonplaceholder.typicode.com/${type}/${id}`);
