import React, { useState } from "react";

export default function Exercises() {
  // Fake placeholder exercise list for demo
  const [exercises] = useState([
    { id: 1, name: "Bench Press", muscle: "Chest" },
    { id: 2, name: "Squats", muscle: "Legs" },
    { id: 3, name: "Deadlift", muscle: "Back" },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Exercises</h2>

      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {exercises.map((exercise) => (
            <li
              key={exercise.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "5px",
                background: "#111",
              }}
            >
              <strong>{exercise.name}</strong>
              <p>Target Muscle: {exercise.muscle}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
