import React, { useState } from "react";

export default function WorkoutVersionPage() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Full Body Beginner", goal: "Strength", version: 1 },
    { id: 2, name: "Upper Body", goal: "Hypertrophy", version: 1 }
  ]);

  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", goal: "" });

  const loadWorkout = (w) => {
    setEditing(w.id);
    setForm({ name: w.name, goal: w.goal });
  };

  const saveVersion = (e) => {
    e.preventDefault();

    if (!editing) return;

    const workout = workouts.find((w) => w.id === editing);
    const sameName = workouts.filter((w) => w.name === workout.name);
    const nextVersion = Math.max(...sameName.map((w) => w.version)) + 1;

    const newWorkout = {
      id: Date.now(),
      name: form.name,
      goal: form.goal,
      version: nextVersion,
    };

    setWorkouts([...workouts, newWorkout]);
    setSelected(newWorkout.id);
    setEditing(null);
    setForm({ name: "", goal: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Workout List</h2>
      {workouts.map((w) => (
        <div key={w.id} style={{ border: "1px solid black", margin: "5px", padding: "5px" }}>
          <p>{w.name} (v{w.version})</p>
          <button onClick={() => setSelected(w.id)}>View</button>
        </div>
      ))}

      <hr />

      <h2>Workout Details</h2>
      {selected ? (
        <>
          <p>
            <strong>Name:</strong> {workouts.find((w) => w.id === selected).name}
          </p>
          <p>
            <strong>Goal:</strong> {workouts.find((w) => w.id === selected).goal}
          </p>
          <button onClick={() => loadWorkout(workouts.find((w) => w.id === selected))}>
            Edit Workout
          </button>
        </>
      ) : (
        <p>Select a workout to view it</p>
      )}

      <hr />

      <h2>Edit + Save New Version</h2>
      <form onSubmit={saveVersion}>
        <input
          type="text"
          placeholder="Workout Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Goal"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />
        <br />
        <button type="submit">Save New Version</button>
      </form>
    </div>
  );
}
