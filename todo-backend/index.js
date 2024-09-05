const express = require('express');
const connectDB = require('./config');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// CORS setup for Vercel frontend
app.use(cors({
  origin: 'https://todo-list-ebon-phi-50.vercel.app', // Replace with your actual frontend deployment URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// Root route
app.get("/", (req, res) => {
  res.json("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
