import { useState, useEffect } from 'react';

export const apiURL = 'http://localhost:3001/';

// Normalizes API responses to extract the data payload.
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

// Generic fetch helper. It does NOT log with console.error
// and lets the caller handle any errors.
const fetchData = async (endpoint, setter) => {
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();
  const normalized = normalizeResponse(json);

  if (typeof setter === 'function') {
    setter(normalized);
  }

  // Also return the data for callers that want it
  return normalized;
};

export default fetchData;
