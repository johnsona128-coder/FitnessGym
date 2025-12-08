// server/routes/workouts.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/current/:memberId', async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const [workoutRows] = await db.query(
      'SELECT * FROM workouts WHERE member_id = ? ORDER BY workout_date DESC LIMIT 1',
      [memberId]
    );

    if (!workoutRows || workoutRows.length === 0) {
      return res.json({ success: true, workout: null, message: 'No workout assigned' });
    }

    const workoutData = workoutRows[0];

    const [exRows] = await db.query(
      'SELECT * FROM workout_exercises WHERE workout_id = ?',
      [workoutData.id]
    );

    return res.json({
      success: true,
      workout: {
        id: workoutData.id,
        date: workoutData.workout_date,
        notes: workoutData.notes,
        exercises: exRows.map(ex => ({
          name: ex.exercise_name || ex.name || 'Unknown',
          sets: ex.sets,
          reps: ex.reps,
          notes: ex.notes || ''
        }))
      }
    });
  } catch (err) {
    console.error('workouts route error:', err);
    // Return full error for local debugging only
    return res.status(500).json({ success: false, message: err.message, stack: err.stack });
  }
});

module.exports = router;
