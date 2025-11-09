const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ZAQ!@WSXcde34rfv', // ← CHANGE THIS!
  database: 'gym_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to Gym database');
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ============= Exercises ENDPOINTS =============
// Get all Exercises
app.get('/api/Exercise', (req, res) => {
  db.query('SELECT * FROM Exercise ORDER BY ExerciseName DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get single Exercise
app.get('/api/Exercise/:ExerciseID', (req, res) => {
  db.query('SELECT * FROM Exercise where ExerciseID = ?', [req.params.ExerciseID], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results[0]);
  });
});

// Create Exercise
app.post('/api/Exercise', (req, res) => {
  const { ExerciseName, Description,MuscleGroupID,ExerciseGroupID,SafetyTips } = req.body;
  db.query(
    'INSERT INTO Exercise (ExerciseName, Description,MuscleGroupID,ExerciseGroupID,SafetyTips) VALUES (?, ?, ?, ?, ?)',
    [ExerciseName, Description,MuscleGroupID,ExerciseGroupID,SafetyTips],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: result.insertId, 
        name, 
        wod_type, 
        description, 
        time_cap, 
        date, 
        is_benchmark 
      });
    }
  );
});

// Update Exercise
app.put('/api/Exercise/:ExerciseID', (req, res) => {
  const {ExerciseName, Description,MuscleGroupID,ExerciseGroupID,SafetyTips } = req.body;
  db.query(
    'UPDATE Exercise SET ExerciseName = ?, Description = ?, MuscleGroupID = ?, ExerciseGroupID = ?, SafetyTips = ?, WHERE ExerciseID = ?',
    [ExerciseName, Description,MuscleGroupID,ExerciseGroupID,SafetyTips, req.params.ExerciseID],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: req.params.ExerciseID, 
        name, 
        description, 
        MuscleGroupID, 
	ExerciseGroupID,
        SafetyTips
      });
    }
  );
});

// Delete Exercise
app.delete('/api/Exercise/:ExerciseID', (req, res) => {
  db.query('DELETE FROM Exercise WHERE ExerciseID = ?', [req.params.ExerciseID], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Exercise deleted' });
  });
});

// ============= Exercises ENDPOINTS =============

// Get all ExerciseSteps
app.get('/api/ExerciseSteps', (req, res) => {
  db.query('SELECT * FROM ExerciseSteps ORDER BY OrderNumber', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get single ExerciseSteps
app.get('/api/ExerciseSteps/:StepID', (req, res) => {
  db.query('SELECT * FROM ExerciseSteps WHERE StepID = ?', [req.params.StepID], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results[0]);
  });
});

// Create ExerciseSteps
app.post('/api/ExerciseSteps', (req, res) => {
  const { ExerciseID, StepDescription,OrderNumber } = req.body;
  db.query(
    'INSERT INTO ExerciseSteps (ExerciseID, StepDescription,OrderNumber) VALUES (?, ?, ?)',
    [ExerciseID, StepDescription,OrderNumber],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: result.insertId, 
        ExerciseID, StepDescription,OrderNumber  });
    }
  );
});

// Update Exercise
app.put('/api/Exercise/:StepID', (req, res) => {
  const {ExerciseID, StepDescription,OrderNumber } = req.body;
  db.query(
    'UPDATE Exercise SET ExerciseID = ?, StepDescription = ?, OrderNumber = ?, ExerciseGroupID = ?, WHERE StepID = ?',
    [ExerciseID, StepDescription,OrderNumber, req.params.StepID],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: req.params.StepID,  
        ExerciseID,
        StepDescription,
        OrderNumber
      });
    }
  );
});

// Delete ExerciseSteps
app.delete('/api/ExerciseSteps/:StepID', (req, res) => {
  db.query('DELETE FROM ExerciseSteps WHERE StepID = ?', [req.params.StepID], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Exercise Step deleted' });
  });
});