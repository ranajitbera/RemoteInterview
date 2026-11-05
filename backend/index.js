import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { serve } from "inngest/express";
import { inngest,functions } from "./config/inngest.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inngest",serve({client:inngest,servePath:"/api/inngest",functions}))


app.listen(port, "0.0.0.0", async () => {
  await connectDB();
  console.log(`Server is running http://localhost:${port}`);
});
