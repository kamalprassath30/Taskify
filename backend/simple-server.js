import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

// Basic middleware
app.use(cors({
  origin: "*", // Allow all origins for testing
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Taskify API is running!", status: "ok" });
});

// Test API endpoint
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "API test endpoint working!", status: "ok" });
});

// Mock login endpoint
app.post("/api/v1/login", (req, res) => {
  const { email, password } = req.body;
  
  // Simple mock authentication
  if (email === "test@test.com" && password === "test123") {
    res.json({ 
      message: "Login successful", 
      user: { email, name: "Test User" },
      token: "mock-jwt-token"
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Mock register endpoint
app.post("/api/v1/register", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  res.json({ 
    message: "User registered successfully", 
    user: { name, email }
  });
});

app.listen(port, () => {
  console.log(`Simple server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/`);
  console.log(`Test endpoint: http://localhost:${port}/api/v1/test`);
}); 