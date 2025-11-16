import { useState, useEffect } from 'react';

export const apiURL = 'http://localhost:3001/';


//Normalizes API responses to extract the data payload.
const normalizeResponse = (json) => {
  if (Array.isArray(json)) {
    return json;
  }
  if (json && json.data !== undefined) {
    return Array.isArray(json.data) ? json.data : [json.data];
  }
  if (json && typeof json === 'object') {
    return [json];
  }
  return [];
};

//Fetches the data
const fetchData = async (endpoint, setter) => {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    const normalized = normalizeResponse(json);
    setter(normalized);
  } catch (err) {
    console.error('Error fetching:', err);
  }
};

export default fetchData; 