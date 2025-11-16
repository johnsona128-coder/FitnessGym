import { useState, useEffect } from 'react';
import fetchData, { apiURL as helperApiURL } from '../components/utils.js';
import ExerciseDetailsModal from "./ExerciseDetailsModal.jsx";

const baseApiURL = helperApiURL.replace(/\/$/, '');

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${baseApiURL}/exercises`;
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

  const handleClick = (exerciseId) => {
    console.log("Selected Exercise ID:", exerciseId);
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
    <div>
      <h2>Exercises</h2>
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

      {/* Pass selectedExerciseId to modal */}
      <ExerciseDetailsModal
        show={showModal}
        onClose={closeModal}
        exerciseId={selectedExerciseId}  
      />
    </div>
  );
}