import { useState, useEffect } from 'react';
import fetchData, { apiURL as helperApiURL } from '../components/utils';
import Notification from '../components/notification.jsx';
import '../styles/memberAssessment.css';

const baseApiURL = helperApiURL.replace(/\/$/, '');

/**
 * PBI: Member Assessment Management
 * This component allows a gym owner to record and view fitness assessments for members.
 * It includes form validation, submission logic, and displays assessment history.
 */
export default function MemberAssessment() {
  // STATE: Member identification and information
  const [memberId, setMemberId] = useState(1);
  const [memberName, setMemberName] = useState('');
  
  // STATE: Assessment form data
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [fitnessLevel, setFitnessLevel] = useState(''); // 1-5 scale
  const [goals, setGoals] = useState(''); // Required field
  const [injuries, setInjuries] = useState(''); // Optional field
  
  // STATE: UI control and data management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessments, setAssessments] = useState([]); // Assessment history
  
  // STATE: Notification system for user feedback
  const [notification, setNotification] = useState({
    show: false,
    type: 'info',
    title: '',
    message: ''
  });

  // FUNCTION: Display notification to user
  const showNotification = (type, title, message) => {
    setNotification({
      show: true,
      type,
      title,
      message
    });
  };

  // FUNCTION: Close notification
  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  // EFFECT: Load member information on component mount or when memberId changes
  useEffect(() => {
    const loadMember = async () => {
      try {
        const endpoint = `${baseApiURL}/members/${memberId}`;
        await fetchData(endpoint, (data) => {
          const memberArray = data.data || data;
          const member = Array.isArray(memberArray) ? memberArray[0] : memberArray;
          if (member) {
            // Construct full name from first and last name
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

  // EFFECT: Load member's assessment history
  useEffect(() => {
    const loadAssessments = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${baseApiURL}/assessments/${memberId}`;
        await fetchData(endpoint, (data) => {
          const assessmentsArray = data.data || data;
          // Ensure we always have an array for rendering
          setAssessments(Array.isArray(assessmentsArray) ? assessmentsArray : []);
        });
      } catch (err) {
        setError(err.message || String(err));
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (memberId) {
      loadAssessments();
    }
  }, [memberId]);

  // FUNCTION: Validates and saves assessment data
  const handleSaveAssessment = async () => {
    // VALIDATION: Check for required fitness level
    if (!fitnessLevel) {
      showNotification('warning', 'Missing Field', 'Please select a fitness level');
      return;
    }
    
    // VALIDATION: Check for required goals field
    if (!goals.trim()) {
      showNotification('warning', 'Missing Field', 'Please enter fitness goals');
      return;
    }

    try {
      // Prepare assessment data for API submission
      const assessmentData = {
        memberId,
        fitnessLevel: parseInt(fitnessLevel), // Convert string to integer
        goals: goals.trim(),
        injuries: injuries.trim() || 'None', // Default to 'None' if empty
        assessmentDate
      };

      // POST: Submit assessment to API
      const response = await fetch(`${baseApiURL}/assessments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData)
      });

      const result = await response.json();

      if (result.success) {
        // SUCCESS: Show confirmation and reset form
        showNotification('success', 'Success!', 'Assessment saved successfully!');
        
        // RESET: Clear form fields for next entry
        setFitnessLevel('');
        setGoals('');
        setInjuries('');
        setAssessmentDate(new Date().toISOString().split('T')[0]);
        
        // RELOAD: Fetch updated assessment history
        const endpoint = `${baseApiURL}/assessments/${memberId}`;
        await fetchData(endpoint, (data) => {
          const assessmentsArray = data.data || data;
          setAssessments(Array.isArray(assessmentsArray) ? assessmentsArray : []);
        });
      } else {
        // ERROR: Display failure message
        showNotification('error', 'Error', 'Failed to save assessment: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error saving assessment:', err);
      showNotification('error', 'Error', 'Error saving assessment: ' + err.message);
    }
  };

  // FUNCTION: Clear form to start new assessment
  const handleStartNewAssessment = () => {
    setFitnessLevel('');
    setGoals('');
    setInjuries('');
    setAssessmentDate(new Date().toISOString().split('T')[0]);
  };

  // UTILITY: Format date for display (e.g., "Jan 15, 2024")
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // UTILITY: Convert numeric fitness level to readable label
  const getFitnessLevelLabel = (level) => {
    const levels = {
      1: 'Beginner',
      2: 'Below Average',
      3: 'Average',
      4: 'Above Average',
      5: 'Advanced'
    };
    return levels[level] || 'Unknown';
  };

  // CONDITIONAL RENDERING: Show loading state
  if (loading) return <div className="loading-message" role="status" aria-live="polite">Loading assessments…</div>;
  
  // CONDITIONAL RENDERING: Show error state
  if (error) return <div className="error-message" role="alert" aria-live="assertive">Error loading assessments: {error}</div>;

  // RENDER: Main component UI
  return (
    <main className="member-assessment-container">
      
      {/* -------- HEADER SECTION: Welcome message with member name -------- */}
      <header className="welcome-section">
        <h1>Assessment for {memberName || 'Loading...'}!</h1>
        <p className="welcome-message">Record fitness assessment and track progress.</p>
      </header>

      <div id="main-content">
        
        {/* -------- ASSESSMENT FORM SECTION -------- */}
        <section className="assessment-form" aria-labelledby="create-assessment-heading">
          <h2 id="create-assessment-heading">New Assessment</h2>
          
          {/* Hidden field for member ID - used in submission but not displayed */}
          <input type="hidden" value={memberId} aria-hidden="true" />

          {/* FORM GROUP: Assessment Date */}
          <div className="form-group">
            <label htmlFor="assessment-date">
              Assessment Date:
              <input
                id="assessment-date"
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="form-input"
                aria-required="true"
              />
            </label>
          </div>

          {/* FORM GROUP: Fitness Level (1-5 scale, required) */}
          <div className="form-group">
            <label htmlFor="fitness-level">
              Fitness Level:
              <select
                id="fitness-level"
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
                className="form-select"
                aria-required="true"
              >
                <option value="">Select fitness level...</option>
                <option value="1">1 - Beginner (little to no exercise experience)</option>
                <option value="2">2 - Below Average (some exercise but inconsistent)</option>
                <option value="3">3 - Average (regular moderate exercise)</option>
                <option value="4">4 - Above Average (consistent vigorous exercise)</option>
                <option value="5">5 - Advanced (athlete level fitness)</option>
              </select>
            </label>
          </div>

          {/* FORM GROUP: Fitness Goals (required) */}
          <div className="form-group">
            <label htmlFor="goals">
              Fitness Goals:
              <textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="form-textarea"
                rows="4"
                placeholder="Enter fitness goals and objectives..."
                aria-required="true"
                aria-describedby="goals-description"
              />
            </label>
            <span id="goals-description" className="sr-only">Required: Member's fitness goals</span>
          </div>

          {/* FORM GROUP: Injuries/Concerns (optional) */}
          <div className="form-group">
            <label htmlFor="injuries">
              Injuries/Concerns:
              <textarea
                id="injuries"
                value={injuries}
                onChange={(e) => setInjuries(e.target.value)}
                className="form-textarea"
                rows="4"
                placeholder="List any injuries, medical conditions, or concerns (optional)..."
                aria-describedby="injuries-description"
              />
            </label>
            <span id="injuries-description" className="sr-only">Optional: Any injuries or medical concerns</span>
          </div>

          {/* ACTION BUTTONS: Save and Clear */}
          <div className="action-buttons" role="group" aria-label="Assessment actions">
            <button
              onClick={handleSaveAssessment}
              className="save-assessment-btn"
              aria-label="Save assessment"
            >
              Save Assessment
            </button>
            <button
              onClick={handleStartNewAssessment}
              className="clear-btn"
              aria-label="Clear form"
            >
              Clear Form
            </button>
          </div>
        </section>

        {/* -------- ASSESSMENT HISTORY SECTION -------- */}
        <section className="assessment-history-section" aria-labelledby="assessment-history-heading">
          <h3 id="assessment-history-heading">Assessment History ({assessments.length})</h3>
          
          {/* CONDITIONAL: Show message if no assessments exist */}
          {assessments.length === 0 ? (
            <div className="no-assessments-message" role="status">No previous assessments found.</div>
          ) : (
            /* ASSESSMENT LIST: Display all previous assessments */
            <div className="assessments-list" aria-label="Previous assessments">
              {assessments.map((assessment, index) => (
                <div key={assessment.assessmentId || index} className="assessment-card">
                  
                  {/* CARD HEADER: Date and fitness level badge */}
                  <div className="assessment-header">
                    <span className="assessment-date">{formatDate(assessment.assessmentDate)}</span>
                    <span className="fitness-level-badge">
                      Level {assessment.fitnessLevel} - {getFitnessLevelLabel(assessment.fitnessLevel)}
                    </span>
                  </div>
                  
                  {/* CARD BODY: Goals and injuries information */}
                  <div className="assessment-body">
                    <div className="assessment-section">
                      <strong>Goals:</strong>
                      <p>{assessment.goals}</p>
                    </div>
                    <div className="assessment-section">
                      <strong>Injuries/Concerns:</strong>
                      <p>{assessment.injuries || 'None'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* NOTIFICATION COMPONENT: Displays success/error messages */}
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