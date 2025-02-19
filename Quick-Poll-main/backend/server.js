// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const pollsRouter = require('./routes/polls');

const app = express();

// Middleware
app.use(express.json());
//app.use(cors());
const allowedOrigins = [
  "https://quick-poll-azure.vercel.app/",  // ✅ Replace with your deployed frontend URL
  "http://localhost:3000" // ✅ Keep this for local testing
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Connect to MongoDB (using env variable or default local connection)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/quickpoll';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/polls', pollsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
