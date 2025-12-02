// src/pages/ExerciseLibrary.jsx
import { useEffect, useState } from "react";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../api/exerciseApi";

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState([]);
  const [mode, setMode] = useState("list"); // "list" | "create" | "edit"
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load exercises on first render
  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await getExercises();
      setExercises(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load exercises.");
    } finally {
      setLoading(false);
    }
  }

  function handleAddClick() {
    setSelected(null);
    setMode("create");
  }

  function handleEditClick(exercise) {
    setSelected(exercise);
    setMode("edit");
  }

  async function handleDeleteClick(id) {
    const sure = window.confirm("Delete this exercise?");
    if (!sure) return;

    try {
      await deleteExercise(id);
      setExercises(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete exercise.");
    }
  }

  async function handleSave(formData) {
    try {
      if (mode === "create") {
        const created = await createExercise(formData);
        setExercises(prev => [...prev, created]);
      } else if (mode === "edit" && selected) {
        const updated = await updateExercise(selected.id, formData);
        setExercises(prev =>
          prev.map(e => (e.id === updated.id ? updated : e))
        );
      }
      setMode("list");
      setSelected(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save exercise.");
    }
  }

  function handleCancel() {
    setMode("list");
    setSelected(null);
  }

  // --- RENDER ---

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Exercise Library</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (mode === "create" || mode === "edit") {
    return (
      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <h1 style={{ textAlign: "center" }}>
          {mode === "create" ? "Add Exercise" : "Edit Exercise"}
        </h1>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}

        <ExerciseForm
          initialValue={mode === "edit" ? selected : null}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // mode === "list"
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Exercise Library</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Manage exercise demos with name, description, and image / video URL.
      </p>

      {error && (
        <p style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button
          onClick={handleAddClick}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
          }}
        >
          + Add Exercise
        </button>
      </div>

      {exercises.length === 0 ? (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          No exercises yet. Click <b>+ Add Exercise</b> to create one.
        </div>
      ) : (
        <div>
          {exercises.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- CHILD COMPONENTS ----------

function ExerciseCard({ exercise, onEdit, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "12px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src={exercise.mediaUrl}
          alt={exercise.name}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            borderRadius: "6px",
            border: "1px solid #eee",
          }}
          onError={e => {
            e.currentTarget.src =
              "https://via.placeholder.com/120?text=No+Image";
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ margin: 0 }}>{exercise.name}</h2>
        <p style={{ marginTop: "6px", color: "#555" }}>
          {exercise.description || "No description provided."}
        </p>
        <p style={{ marginTop: "6px", fontSize: "12px", color: "#888" }}>
          Last updated:{" "}
          {exercise.updatedAt
            ? new Date(exercise.updatedAt).toLocaleString()
            : "—"}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => onEdit(exercise)}
          style={{ padding: "6px 12px", fontSize: "13px" }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(exercise.id)}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ExerciseForm({ initialValue, onSave, onCancel }) {
  const [name, setName] = useState(initialValue?.name || "");
  const [description, setDescription] = useState(
    initialValue?.description || ""
  );
  const [mediaUrl, setMediaUrl] = useState(initialValue?.mediaUrl || "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!mediaUrl.trim()) {
      setError("Image / video URL is required.");
      return;
    }

    setError("");
    onSave({
      name: name.trim(),
      description: description.trim(),
      mediaUrl: mediaUrl.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}

      <div style={{ marginBottom: "10px" }}>
        <label>
          Name
          <br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Description
          <br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginTop: "4px",
              minHeight: "80px",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Image / Video URL
          <br />
          <input
            type="text"
            value={mediaUrl}
            onChange={e => setMediaUrl(e.target.value)}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </label>
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ padding: "8px 16px" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
