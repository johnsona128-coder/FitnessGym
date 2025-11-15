import { useState, useEffect } from 'react';
import { Dumbbell, Plus, Edit2, Trash2, List, ChevronDown, ChevronUp, Divide } from 'lucide-react';
import fetchData, { apiURL } from '../utils';
import { apiURL as helperApiURL } from '../utils';

const baseApiURL = helperApiURL.replace(/\/$/, '');

export default function Demonstration() {
  const [view, setView] = useState('exercises');
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedExerciseData, setSelectedExerciseData] = useState(null);

  // fetch on mount
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const endpoint = `${baseApiURL}/exercises`;
      // fetchData automatically normalizes the response and calls setter with array
      await fetchData(endpoint, setExercises);
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedExercise(id);
    
    if (id !== 'all') {
      // Find the exercise by id
      const exercise = exercises.find(ex => ex.id === parseInt(id));
      if (exercise) {
        setSelectedExerciseData(exercise);
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExerciseData(null);
    setSelectedExercise('all');
  };

  return (
    <div>
      <select
        value={selectedExercise}
        onChange={handleSelectChange}
      >
        <option value="all">All Exercises ({Array.isArray(exercises) ? exercises.length : 0})</option>
        {Array.isArray(exercises) && exercises.map((mg) => {
          const count = exercises.filter(ex => ex.id === mg.id).length;
          return (
            <option key={mg.id} value={mg.id}>
              {mg.exerciseName} ({count})
            </option>
          );
        })}
      </select>

      {/* Modal */}
      {showModal && selectedExerciseData && (
        <div className='ModalOutside'>
                 <div className = 'ModalInside'>
            <h2>{selectedExerciseData.exerciseName}</h2>
            <div style={{ marginTop: 16, lineHeight: 1.8 }}>
              <p><strong>ID:</strong> {selectedExerciseData.id}</p>
              <p><strong>Force Type:</strong> {selectedExerciseData.forceType || 'N/A'}</p>
              <p><strong>Experience Level:</strong> {selectedExerciseData.experienceLevel || 'N/A'}</p>
              <p><strong>Mechanic:</strong> {selectedExerciseData.mechanic || 'N/A'}</p>
              <p><strong>Equipment:</strong> {selectedExerciseData.equipment || 'N/A'}</p>
              <p><strong>Category:</strong> {selectedExerciseData.category || 'N/A'}</p>
              <p><strong>Primary Muscles:</strong> {selectedExerciseData.primaryMuscles || 'N/A'}</p>
              <p><strong>Secondary Muscles:</strong> {selectedExerciseData.secondaryMuscles || 'N/A'}</p>
            </div>
            <button
              onClick={closeModal}
              
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}