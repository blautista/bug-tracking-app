const getJSON = async (url, options) => {
  try {
    const res = await fetch(url, options);
    
    if (res.ok) {
      const data = await res.json();

      return data;
    
    } else {
      throw new Error(`Status code: ${res.status} "${res.statusText}"`)
    }

  } catch(error) {
    return {
      error: error,
      json: undefined,
    }
  }
};

const postJSON = async (url, options, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      }})

    if (res.ok) {
      return 
    }
  } catch {

  }
}
const 