import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check route
app.get("/", (req, res) => {
  res.json({ message: "Taskify API is running!" });
});

// error handler middleware
app.use(errorHandler);

const server = async () => {
  try {
    await connect();

    // Load routes before starting server
    const routeFiles = fs.readdirSync("./src/routes");
    
    for (const file of routeFiles) {
      try {
        const route = await import(`./src/routes/${file}`);
        app.use("/api/v1", route.default);
        console.log(`Loaded route: ${file}`);
      } catch (err) {
        console.log("Failed to load route file", file, err);
      }
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();
