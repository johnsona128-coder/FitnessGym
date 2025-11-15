export const apiURL = 'http://localhost:3001/';


const fetchData = async (endpoint, setter) => {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setter(data);
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

export default fetchData; 