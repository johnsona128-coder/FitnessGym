import { useState } from 'react';

export default function ExerciseInputModal({ show, onClose, exercise, onAddExercise }) {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);

  if (!show || !exercise) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExercise(exercise.id, exercise.exerciseName, Number(sets), Number(reps), Number(weight));
    // Reset form
    setSets(3);
    setReps(10);
    setWeight(0);
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setSets(3);
    setReps(10);
    setWeight(0);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Exercise: {exercise.exerciseName}</h3>
          <button className="modal-close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-group">
            <label htmlFor="sets">Sets:</label>
            <input
              type="number"
              id="sets"
              min="1"
              max="20"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="modal-input"
              required
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              id="reps"
              min="1"
              max="100"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="modal-input"
              required
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="weight">Weight (lbs):</label>
            <input
              type="number"
              id="weight"
              min="0"
              step="5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="modal-input"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="modal-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="modal-submit-btn">
              Add Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}