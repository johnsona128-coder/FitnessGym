import { useState, useEffect } from 'react';
import fetchData, { apiURL as helperApiURL } from '../components/utils.jsx';

const baseApiURL = helperApiURL.replace(/\/$/, '');

export default function MemberWorkout() {
  const [memberId, setMemberId] = useState([]);  
  const [memberWorkout, setMemberWorkout] = useState([]);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);


  // Load available exercises
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${baseApiURL}/exercises`; // Changed to exercises endpoint
        await fetchData(endpoint, (data) => {
          setExercises(Array.isArray(data) ? data : []);
        });
      } catch (err) {
        setError(err.message || String(err));
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddExercise = (exerciseId, sets, reps, weight) => {
    setSelectedExercises([...selectedExercises, {
      exerciseId,
      sets: sets || 0,
      reps: reps || 0,
      weight: weight || 0
    }]);
  };

  const handleRemoveExercise = (index) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleCreateWorkout = async () => {
    if (selectedExercises.length === 0) {
      alert('Please add at least one exercise to the workout');
      return;
    }

    try {
      const workoutData = {
        memberId,
        WorkoutDate: workoutDate,
        notes,
        details: selectedExercises
      };

      const response = await fetch(`${baseApiURL}/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Workout created successfully!');
        // Reset form
        setSelectedExercises([]);
        setNotes('');
        setWorkoutDate(new Date().toISOString().split('T')[0]);
      } else {
        alert('Failed to create workout');
      }
    } catch (err) {
      alert('Error creating workout: ' + err.message);
    }
  };

  const handleClick = (exerciseId) => {
    setSelectedExerciseId(exerciseId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExerciseId(null);
  };

  if (loading) return <div>Loading exercises…</div>;
  if (error) return <div style={{ color: 'crimson' }}>Error loading exercises: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Workout for Member {memberId}</h2>
      
      {/* Workout Form */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Member ID: 
            <input 
              type="number" 
              value={memberId} 
              onChange={(e) => setMemberId(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            Workout Date: 
            <input 
              type="date" 
              value={workoutDate} 
              onChange={(e) => setWorkoutDate(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            Notes: 
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
              rows="3"
            />
          </label>
        </div>
      </div>

      {/* Selected Exercises */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Selected Exercises ({selectedExercises.length})</h3>
        {selectedExercises.length === 0 ? (
          <div>No exercises added yet</div>
        ) : (
          <ul>
            {selectedExercises.map((ex, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                Exercise ID: {ex.exerciseId} - Sets: {ex.sets}, Reps: {ex.reps}, Weight: {ex.weight}
                <button 
                  onClick={() => handleRemoveExercise(index)}
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        
        <button 
          onClick={handleCreateWorkout}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Create Workout
        </button>
      </div>

      {/* Available Exercises */}
      <div>
        <h3>Available Exercises</h3>
        {exercises.length === 0 ? (
          <div>No exercises available.</div>
        ) : (
          <ul>
            {exercises.map((ex) => (
              <li
                key={ex.id}
                onClick={() => handleClick(ex.id)}
                style={{ cursor: 'pointer', textDecoration: 'underline', margin: '6px 0' }}
              >
                {ex.exerciseName}
              </li>
            ))}
          </ul>
        )}
      </div>

      
    </div>
  );
}