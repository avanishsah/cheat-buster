const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://127.0.0.1:3001',  
    'http://localhost:3001',   
    'http://localhost:3000'    
  ],
  methods: ['GET', 'POST'], 
  credentials: true          
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Cheat Buster API is running!');
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`);
});
