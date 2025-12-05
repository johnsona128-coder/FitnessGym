import { useState, useEffect } from 'react';
import fetchData, { apiURL } from '../components/utils';
import { apiURL as helperApiURL } from '../components/utils';

const baseApiURL = helperApiURL.replace(/\/$/, '');

export default function Demonstration() {
  const [view, setView] = useState('exercises');
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedExerciseData, setSelectedExerciseData] = useState(null);
  const [exerciseSteps, setExerciseSteps] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(false);
  const [stepsError, setStepsError] = useState(null);
  const [selectedExerciseInstructions, setSelectedExerciseInstructions] = useState(null);
  

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



  const handleExerciseClick = (exercise) => {
    if (!exercise) return;
    setSelectedExercise(exercise.id ?? exercise.ID ?? exercise.ExerciseID ?? 'selected');
    setSelectedExerciseData(exercise);
    setShowModal(true);
  };

  // Fetch steps when an exercise is selected
  useEffect(() => {
    const loadSteps = async (exerciseId) => {
      setStepsLoading(true);
      setStepsError(null);
      try {
        // Call exercise-specific instructions endpoint
        const endpoint = `${baseApiURL}/exercises/${exerciseId}/instructions/`;
        await fetchData(endpoint, (data) => {
          // fetchData returns a normalized array
          const items = Array.isArray(data) ? data : [];
          // Sort by common order fields if present (stepNumber, OrderNumber, order)
          items.sort((a, b) => {
            const oa = a.stepNumber ?? a.OrderNumber ?? a.order ?? 0;
            const ob = b.stepNumber ?? b.OrderNumber ?? b.order ?? 0;
            return oa - ob;
          });
          setExerciseSteps(items);
        });
      } catch (err) {
        console.error('Error loading steps:', err);
        setStepsError(err.message || String(err));
        setExerciseSteps([]);
      } finally {
        setStepsLoading(false);
      }
    };

    if (selectedExerciseData) {
      loadSteps(selectedExerciseData.id);
    } else {
      setExerciseSteps([]);
    }
  }, [selectedExerciseData]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedExerciseData(null);
    setSelectedExercise('all');
  };

  return (
    <div>
      <div>
        <h3>All Exercises ({Array.isArray(exercises) ? exercises.length : 0})</h3>
        <ul>
          {Array.isArray(exercises) && exercises.map((mg) => (
            <li key={mg.id ?? mg.ID ?? mg.ExerciseID ?? mg.exerciseID ?? mg.exerciseName}
                style={{ cursor: 'pointer', textDecoration: 'underline', margin: '6px 0' }}
                onClick={() => handleExerciseClick(mg)}
            >
              {mg.exerciseName ?? mg.exercise_name ?? mg.ExerciseName}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {showModal && selectedExerciseData && (
        <div className='ModalOutside'>
          <div className='ModalInside'>
            <h2>{selectedExerciseData.exerciseName} ({selectedExerciseData.id})</h2>
            <span>{selectedExerciseData.category || 'N/A'} - {selectedExerciseData.equipment || 'N/A'}</span>


            {(() => {
              // App only accepts MP4 uploads; render MP4 if present
              const v = selectedExerciseData.videoUrl ?? selectedExerciseData.video ?? selectedExerciseData.video_link ?? selectedExerciseData.videoFile ?? selectedExerciseData.video_path;
              if (!v) {
                return <div style={{ margin: '12px 0' }}>No video available for this exercise.</div>;
              }



              let src = String(v);
              // If it's a relative path (no protocol), resolve to app origin so dev server can serve it
              if (!/^https?:\/\//i.test(src)) {
                if (!src.startsWith('/')) src = `/${src}`;
                src = `${window.location.origin}${src}`;
              }

              // Assume MP4; set MIME type accordingly
              const mime = 'video/mp4';
              return (
                <div style={{ margin: '12px 0' }}>
                  <video width="400" controls>
                    <source src={src} type={mime} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            })()}
            <div>
              <div className="exercise-grid">
                <div className="item"><span className="detailsTitle">Force</span><br />{selectedExerciseData.forceType || 'N/A'}</div>
                <div className="item"><span className="detailsTitle">Level</span><br />{selectedExerciseData.experienceLevel || 'N/A'}</div>
                <div className="item"><span className="detailsTitle">Mechanic</span><br />{selectedExerciseData.mechanic || 'N/A'}</div>
                <div className="item"><span className="detailsTitle">Primary</span><br />{selectedExerciseData.primaryMuscles  || 'N/A'}</div>
                <div className="item"><span className="detailsTitle">Secondary</span><br />{selectedExerciseData.secondaryMuscles  || 'N/A'}</div>
              </div>

              {/* Instructions / steps */}
              <div style={{ marginTop: 16 }}>
                <h3>Instructions</h3>
                  {!stepsLoading && !stepsError && (
                  Array.isArray(exerciseSteps) && exerciseSteps.length > 0 ? (
                    <ol>
                      {exerciseSteps.map((s) => {
                        const text = s.instruction;
                        const key = s.id;
                        return <li key={key}>{text}</li>;
                      })}
                    </ol>
                  ) : (
                    <div>No instructions available.</div>
                  )
                )}
              </div>

              <button className='submitBtn' onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}