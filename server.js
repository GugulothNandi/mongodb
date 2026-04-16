import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import hipaRoutes from "./routes/hipaRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/hipa", hipaRoutes);
app.use("/api/deals", dealRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
