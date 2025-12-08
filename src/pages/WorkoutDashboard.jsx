import React, { useState } from "react";
import { fetchCurrentWorkout } from "../api/workoutApi";

export default function WorkoutDashboard() {
  const [date, setDate] = useState("");
  const [apiWorkout, setApiWorkout] = useState(null);
  const [msg, setMsg] = useState("");
  const [memberId, setMemberId] = useState("1"); // simple member id input

  const workouts = {
    Sunday: [
      "Light Cycling – 10 min",
      "Bodyweight Circuit – 3 rounds",
      "Push-ups – 3x10",
      "Sit-ups – 3x15"
    ],
    Monday: [
      "Squats – 3x8",
      "Leg Press – 3x10",
      "Leg Curl – 3x12",
      "Calf Raise – 3x15"
    ],
    Tuesday: [
      "Bench Press – 3x8",
      "Dumbbell Fly – 3x10",
      "Push-ups – 3x12",
      "Tricep Dips – 3x10"
    ],
    Wednesday: [
      "Lat Pulldown – 3x10",
      "Row Machine – 3x10",
      "Seated Row – 3x10",
      "Back Extension – 3x12"
    ],
    Thursday: [
      "Shoulder Press – 3x10",
      "Lateral Raise – 3x12",
      "Front Raise – 3x12",
      "Reverse Fly – 3x12"
    ],
    Friday: [
      "Deadlift – 3x6",
      "Hip Thrust – 3x10",
      "Glute Bridge – 3x12",
      "Romanian Deadlift – 3x8"
    ],
    Saturday: [
      "Lunges – 3x10 each leg",
      "Plank – 3x30 sec",
      "Side Plank – 3x20 sec each side",
      "Mountain Climbers – 3x20"
    ]
  };

  const styles = {
    page: { maxWidth: 500, margin: "20px auto", fontFamily: "Arial" },
    box: { border: "1px solid #ccc", padding: 12, borderRadius: 6, marginTop: 12 }
  };

  function getWorkout(d) {
    if (!d) return null;
    const day = new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long"
    });
    return workouts[day] || null;
  }

  const todayWorkout = getWorkout(date);

  // simple API loader
  async function loadWorkoutFromApi() {
    setMsg("Loading...");
    setApiWorkout(null);

    try {
      const data = await fetchCurrentWorkout(memberId);
      if (data && data.success && data.workout) {
        setApiWorkout(data.workout);
        setMsg("");
      } else if (data && data.success && !data.workout) {
        setMsg(data.message || "No workout assigned");
      } else {
        setMsg((data && data.message) || "Unable to fetch workout");
      }
    } catch (err) {
      setMsg("Error fetching workout");
      console.error(err);
    }
  }

  return (
    <div style={styles.page}>
      <h2>Workout Dashboard</h2>

      <label>Select Date: </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {todayWorkout ? (
        <div style={styles.box}>
          <h3>Today's Exercises</h3>
          <ul>
            {todayWorkout.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ marginTop: 12 }}>Choose a date to see your workout.</p>
      )}

      <hr style={{ marginTop: 20 }} />

      {/* Simple API section */}
      <div>
        <h3>Current Workout From DB</h3>

        <div style={{ marginBottom: 8 }}>
          <label>Member ID: </label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            style={{ width: 60, marginRight: 8 }}
          />
          <button onClick={loadWorkoutFromApi}>Load Workout</button>
        </div>

        {msg && <p>{msg}</p>}

        {apiWorkout && (
          <div style={styles.box}>
            <p><strong>Date:</strong> {apiWorkout.date}</p>
            {apiWorkout.notes && <p><strong>Notes:</strong> {apiWorkout.notes}</p>}

            <h4>Exercises</h4>
            <ul>
              {apiWorkout.exercises && apiWorkout.exercises.length > 0 ? (
                apiWorkout.exercises.map((ex, i) => (
                  <li key={i}>
                    <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps
                    {ex.notes && <div>Notes: {ex.notes}</div>}
                  </li>
                ))
              ) : (
                <li>No exercises attached to this workout.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
