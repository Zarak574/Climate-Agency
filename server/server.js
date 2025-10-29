require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const alertRoutes = require('./routes/alerts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'));


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
