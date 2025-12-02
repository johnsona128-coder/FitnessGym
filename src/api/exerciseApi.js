// src/api/exerciseApi.js
// Simple, safe localStorage-based "API" for exercises.

const STORAGE_KEY = "exerciseLibrary";

function safeLoadArray() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to parse exerciseLibrary from localStorage:", err);
    localStorage.removeItem(STORAGE_KEY); // reset bad data
    return [];
  }
}

function save(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save exerciseLibrary:", err);
  }
}

// GET /exercises
export function getExercises() {
  const list = safeLoadArray();
  return Promise.resolve(list);
}

// POST /exercises
export function createExercise(exercise) {
  const list = safeLoadArray();
  const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  const now = new Date().toISOString();

  const newItem = {
    id,
    name: exercise.name,
    description: exercise.description,
    mediaUrl: exercise.mediaUrl,
    createdAt: now,
    updatedAt: now,
  };

  list.push(newItem);
  save(list);
  return Promise.resolve(newItem);
}

// PUT /exercises/:id
export function updateExercise(id, updates) {
  const list = safeLoadArray();
  const idx = list.findIndex(e => e.id === id);
  if (idx === -1) {
    console.warn("Exercise not found for update:", id);
    return Promise.resolve(null);
  }

  const now = new Date().toISOString();

  const updated = {
    ...list[idx],
    ...updates,
    updatedAt: now,
  };

  list[idx] = updated;
  save(list);
  return Promise.resolve(updated);
}

// DELETE /exercises/:id
export function deleteExercise(id) {
  const list = safeLoadArray();
  const filtered = list.filter(e => e.id !== id);
  save(filtered);
  return Promise.resolve();
}
