/* This modal is reusable no matter what page you want to link from */

import { useEffect, useState } from "react";
//Getting a reusable connection for fetching data and one central location for setting the URL for the API
import fetchData, { apiURL as helperApiURL } from "../components/utils";
import AutoImageSlider from "../components/photos";

const baseApiURL = helperApiURL.replace(/\/$/, "");

export default function ExerciseDetailsModal({ show, onClose, exerciseId }) {
  const [exercise, setExercise] = useState(null);
  const [steps, setSteps] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!exerciseId) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all exercises and find the selected one
        await fetchData(`${baseApiURL}/exercises/${exerciseId}`, (data) => {
          const arr = Array.isArray(data) ? data : [];
          const selected = arr.find(e => e.id === exerciseId);
          if (!selected) throw new Error("Exercise not found");
          setExercise(selected);
        });

        // Fetch instructions for specific exercise
        await fetchData(`${baseApiURL}/exercises/${exerciseId}/instructions/`, (data) => {
          const arr = Array.isArray(data) ? data : [];
          setSteps(arr);
        });

        // Fetch photos for specific exercise
        await fetchData(`${baseApiURL}/exercises/${exerciseId}/photos/`, (data) => {
          const arr = Array.isArray(data) ? data : [];
          setPhotos(arr);
        });

      } catch (err) {
        setError(err.message || String(err));
        setExercise(null);
        setSteps([]);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [exerciseId]);

  if (!show) return null;



  return (
    <div className="ModalOutside">


      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {exercise && (
        <>
          <h2>{exercise.exerciseName}</h2>
          <p>{exercise.category} - {exercise.equipment}</p>

          <h3>Instructions</h3>
          {steps.length > 0 ? (
            <ol>
              {steps.map((s) => (
                <li key={s.id}>{s.instruction}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available.</p>
          )}

          <div className="exercise-grid">
            <div className="item">
              <span className="detailsTitle">Force</span><br />{exercise.forceType || "N/A"}
            </div>
            <div className="item">
              <span className="detailsTitle">Level</span><br />{exercise.experienceLevel || "N/A"}
            </div>
            <div className="item">
              <span className="detailsTitle">Mechanic</span><br />{exercise.mechanic || "N/A"}
            </div>
            <div className="item">
              <span className="detailsTitle">Primary</span><br />{exercise.primaryMuscles || "N/A"}
            </div>
            <div className="item">
              <span className="detailsTitle">Secondary</span><br />{exercise.secondaryMuscles || "N/A"}
            </div>
          </div>

          {photos.length > 0 ? (
            <div className="photos" >

              <img src={`${baseApiURL}/${photos[0].imagePath}`} className="exercisePhoto" />

            </div>

          ) : (
            <p>No photos are available.</p>
          )}

          <div>
            <button className='submitBtn' onClick={onClose}>Close</button>
          </div>
        </>
      )
      }
    </div >

  );
}