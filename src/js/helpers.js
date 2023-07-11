const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  
export const AJAX = async function(url,uploadData=undefined){
 try{
  const fetchPro = uploadData ? 
 fetch(url,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  }): fetch(url)
  
    const res = await Promise.race([fetchPro,timeout(5)]) 
    const data = await res.json()
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`)
    return data
}
catch(err){
throw err
}
}

/*
export const getJson = async function (url) {
    try{
    const res = await Promise.race([fetch(url),timeout(5)]) 
    const data = await res.json()
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`)
    return data
}
catch(err){
throw err
}}


export const sendJson = async function (url,uploadData) {
  try{
  const res = await Promise.race([fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }),timeout(5)]) 
  const data = await res.json()
  // console.log(data);
  if (!res.ok) throw new Error(`${data.message}(${res.status})`)
  return data
}
catch(err){
throw err
}}*/