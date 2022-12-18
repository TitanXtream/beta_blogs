import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import PostRoutes from "./routes.js";
import db from "./db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", PostRoutes);

db.connect()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`<>--${error} : Did not connect--<>`));

// mongoose.set("useFindAndModify", false);
