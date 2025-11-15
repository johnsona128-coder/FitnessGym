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
          <div className='ModalInside'>
            <h2>{selectedExerciseData.exerciseName} ({selectedExerciseData.id})</h2>


            {(() => {
              // App only accepts MP4 uploads; render MP4 if present
              const v = selectedExerciseData.videoUrl ?? selectedExerciseData.video ?? selectedExerciseData.video_link ?? selectedExerciseData.videoFile ?? selectedExerciseData.video_path;
              if (!v) {
                return <div style={{ margin: '12px 0' }}>No video available for this exercise.</div>;
              }



              let src = String(v);
              // If it's a relative path (no protocol), resolve to app origin so dev server can serve it
              if (!/^https?:\/\//i.test(src)) {
                if (!src.startsWith('/')) src = `/images/${src}`;
                src = `${window.location.origin}${src}`;
              }

              // Assume MP4; set MIME type accordingly
              const mime = 'video/mp4';
              return (
                <div style={{ margin: '12px 0' }}>
                  <video width="400" controls>
                    <source src={selectedExerciseData.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            })()}

            <div>
              <p>
                <strong>Force Type:</strong> {selectedExerciseData.forceType || 'N/A'}<br />
                <strong>Experience Level:</strong> {selectedExerciseData.experienceLevel || 'N/A'}<br />
                <strong>Mechanic:</strong> {selectedExerciseData.mechanic || 'N/A'}<br />
                <strong>Equipment:</strong> {selectedExerciseData.equipment || 'N/A'}<br />
                <strong>Category:</strong> {selectedExerciseData.category || 'N/A'}<br />
                <strong>Primary Muscles:</strong> {selectedExerciseData.primaryMuscles || 'N/A'}<br />
                <strong>Secondary Muscles:</strong> {selectedExerciseData.secondaryMuscles || 'N/A'}
              </p>
            </div>

            <button className='submitBtn' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}