import { useState, useEffect } from 'react';
import { Dumbbell, Plus, Edit2, Trash2, List, ChevronDown, ChevronUp, Divide } from 'lucide-react';
//import fetchData from '../helpers';
import  apiURL from '../helpers';




export default function Demonstration() {
  const [view, setView] = useState('exercises');
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});

  // For exercises and assigned attributes
  //useEffect(() => {
 //   fetchData(`${apiURL}/exercises`, setExercises);
 // }, []);


    const fetchExercises = async () => {
    try {
      const res = await fetch(`${apiURL}/exercises`);
      const data = await res.json();
      console.log(`${apiURL}`);
      setExercises(data);
    } catch (err) {
      console.log(`${apiURL}`);
      console.error('Error fetching exercises:', err);
    }
  };




  return (

    <div>
      <header>
        <div>
          <h1>Exercise Demonstration</h1>
          <Divide>
            <button onClick={() => setView('exercises')}>
              <List /> Exercises
            </button>
          </Divide>
        </div>
      </header>
      </div>
  )
}