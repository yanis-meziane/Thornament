import express from "express";
import cors from "cors";
import "./db/db.js";
import routes from "./routes/routes.js";

process.loadEnvFile(".env");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// ✅ CORS avant les routes
app.use(
  cors({
    origin: process.env.URL_FRONTED || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight OPTIONS (Express 5 safe)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use("/api", routes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
