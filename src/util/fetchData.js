var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


let requestOptions = (type, raw) => {
    type==='GET'? {
    method: type,
    headers: myHeaders,
    redirect: "follow"
  }:{
    method: type,
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

};

const fetchData = (url_api, type, raw) => {
  return fetch(url_api, requestOptions(type, JSON.stringify(raw)))
};

export default fetchData;
