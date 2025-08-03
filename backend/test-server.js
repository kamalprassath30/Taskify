import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Test server is running!" });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "API test endpoint working!" });
});

app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
}); 