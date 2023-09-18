const express = require('express');
const mongooseConnect =require("./config/config")
const cors = require('cors');
const app = express();
const PORT = 5000;

// Connect to MongoDB
mongooseConnect()

app.use(express.json());

// Enable CORS 
app.use(cors({
    origin: 'http://127.0.0.1:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  

// Use routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
