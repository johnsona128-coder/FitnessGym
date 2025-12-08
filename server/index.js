const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const workoutsRoute = require('./routes/workouts');
app.use('/api/workouts', workoutsRoute);

app.listen(5000, () => console.log('Server running on 5000'));


