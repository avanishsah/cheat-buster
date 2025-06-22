// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with specific options
app.use(cors({
  origin: [
    'http://127.0.0.1:3001',  // Your Live Server address
    'http://localhost:3001',   // Alternative localhost address
    'http://localhost:3000'    // Your backend address (for testing)
  ],
  methods: ['GET', 'POST'],    // Allowed HTTP methods
  credentials: true            // Allow cookies if needed
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Cheat Buster API is running!');
});

// Use our user routes for any path starting with /api
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`);
});
