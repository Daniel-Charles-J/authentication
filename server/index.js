import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"


const app = express();
dotenv.config()

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
const PORT = process.env.PORT;
const CONNECTED_URL = process.env.CONNECTION_URL;
mongoose.set("strictQuery",false);
mongoose
  .connect(CONNECTED_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running in: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(`Error: ${err} not connected`));
