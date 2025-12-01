import { useState, useEffect } from 'react';
import fetchData, { apiURL as helperApiURL } from '../components/utils';
import ExerciseInputModal from '../workout/WorkoutInputModal';
import Notification from '../components/notification.jsx';
import '../styles/memberWorkout.css';

const baseApiURL = helperApiURL.replace(/\/$/, '');

export default function MemberWorkout() {
  const [memberId, setMemberId] = useState(1);
  const [memberName, setMemberName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutCreated, setWorkoutCreated] = useState(false);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);
  
  const [notification, setNotification] = useState({
    show: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showNotification = (type, title, message) => {
    setNotification({
      show: true,
      type,
      title,
      message
    });
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  useEffect(() => {
    const loadMember = async () => {
      try {
        const endpoint = `${baseApiURL}/members/${memberId}`;
        await fetchData(endpoint, (data) => {
          const memberArray = data.data || data;
          const member = Array.isArray(memberArray) ? memberArray[0] : memberArray;
          if (member) {
            setMemberName(`${member.firstName} ${member.lastName}` || 'Unknown Member');
          }
        });
      } catch (err) {
        console.error('Error loading member:', err);
        setMemberName('Unknown Member');
      }
    };
    
    if (memberId) {
      loadMember();
    }
  }, [memberId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${baseApiURL}/exercises`;
        await fetchData(endpoint, (data) => {
          const exercisesArray = data.data || data;
          setExercises(Array.isArray(exercisesArray) ? exercisesArray : []);
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

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleAddExercise = (exerciseId, exerciseName, sets, reps, weight) => {
    setSelectedExercises([...selectedExercises, {
      exerciseId,
      exerciseName,
      sets: sets || 0,
      reps: reps || 0,
      weight: weight || 0
    }]);
  };

  const handleRemoveExercise = (index) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleCreateWorkout = async () => {
    setWorkoutCreated(true);
  };

  const handleSaveExercises = async () => {
    if (selectedExercises.length === 0) {
      showNotification('warning', 'No Exercises', 'Please add at least one exercise to the workout');
      return;
    }

    try {
      const workoutData = {
        memberId,
        WorkoutDate: workoutDate,
        notes,
        details: selectedExercises.map(ex => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight
        }))
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
        showNotification('success', 'Success!', 'Workout and exercises saved successfully!');
        setWorkoutCreated(false);
        setCurrentWorkoutId(null);
        setSelectedExercises([]);
        setNotes('');
        setWorkoutDate(new Date().toISOString().split('T')[0]);
      } else {
        showNotification('error', 'Error', 'Failed to save workout: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error saving workout:', err);
      showNotification('error', 'Error', 'Error saving workout: ' + err.message);
    }
  };

  const handleStartNewWorkout = () => {
    setWorkoutCreated(false);
    setCurrentWorkoutId(null);
    setSelectedExercises([]);
    setNotes('');
    setWorkoutDate(new Date().toISOString().split('T')[0]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  if (loading) return <div className="loading-message" role="status" aria-live="polite">Loading exercises…</div>;
  if (error) return <div className="error-message" role="alert" aria-live="assertive">Error loading exercises: {error}</div>;

  return (
    <main className="member-workout-container">
      
      <header className="welcome-section">
        <h1>Welcome, {memberName || 'Loading...'}!</h1>
        <p className="welcome-message">Get started by creating a workout.</p>
      </header>

      <div id="main-content">
        {!workoutCreated ? (
          <section className="workout-form" aria-labelledby="create-workout-heading">
            <h2 id="create-workout-heading">Create New Workout</h2>
            
            <input type="hidden" value={memberId} aria-hidden="true" />

            <div className="form-group">
              <label htmlFor="workout-date">
                Workout Date:
                <input
                  id="workout-date"
                  type="date"
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  className="form-input"
                  aria-required="true"
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="workout-notes">
                Notes:
                <textarea
                  id="workout-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-textarea"
                  rows="3"
                  placeholder="Add workout notes..."
                  aria-describedby="notes-description"
                />
              </label>
              <span id="notes-description" className="sr-only">Optional notes about your workout</span>
            </div>

            <button
              onClick={handleCreateWorkout}
              className="create-workout-btn"
              aria-label="Create new workout"
            >
              Create Workout
            </button>
          </section>
        ) : (
          <>
            <section className="workout-info" aria-labelledby="workout-info-heading">
              <h2 id="workout-info-heading">Add Exercises to Your Workout</h2>
              <p>Workout Date: <time dateTime={workoutDate}>{workoutDate}</time></p>
              {notes && <p>Notes: {notes}</p>}
            </section>

            <section className="selected-exercises-section" aria-labelledby="selected-exercises-heading">
              <h3 id="selected-exercises-heading">Selected Exercises ({selectedExercises.length})</h3>
              {selectedExercises.length === 0 ? (
                <div className="no-exercises-message" role="status">No exercises added yet. Click on exercises below to add them.</div>
              ) : (
                <ul className="selected-exercises-list" aria-label="Selected exercises for workout">
                  {selectedExercises.map((ex, index) => (
                    <li key={index} className="selected-exercise-item">
                      <div className="exercise-details">
                        <span className="exercise-name">{ex.exerciseName}</span> - Sets: {ex.sets}, Reps: {ex.reps}, Weight: {ex.weight} lbs
                      </div>
                      <button
                        onClick={() => handleRemoveExercise(index)}
                        className="remove-btn"
                        aria-label={`Remove ${ex.exerciseName} from workout`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="action-buttons" role="group" aria-label="Workout actions">
                <button
                  onClick={handleSaveExercises}
                  className="create-workout-btn"
                  disabled={selectedExercises.length === 0}
                  aria-label={`Save workout with ${selectedExercises.length} exercises`}
                  aria-disabled={selectedExercises.length === 0}
                >
                  Save Workout ({selectedExercises.length} exercises)
                </button>
                <button
                  onClick={handleStartNewWorkout}
                  className="cancel-btn"
                  aria-label="Cancel and start new workout"
                >
                  Cancel
                </button>
              </div>
            </section>

            <section className="available-exercises-section" aria-labelledby="available-exercises-heading">
              <h3 id="available-exercises-heading">Available Exercises - Click to Add</h3>
              {exercises.length === 0 ? (
                <div className="no-exercises-message" role="status">No exercises available.</div>
              ) : (
                <div className="exercises-grid" role="list" aria-label="Available exercises">
                  {exercises.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => handleExerciseClick(ex)}
                      className="exercise-card"
                      role="listitem"
                      aria-label={`Add ${ex.exerciseName} to workout`}
                    >
                      {ex.exerciseName}
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <ExerciseInputModal
        show={showModal}
        onClose={closeModal}
        exercise={selectedExercise}
        onAddExercise={handleAddExercise}
      />

      <Notification
        show={notification.show}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </main>
  );
}