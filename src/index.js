import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error.", err);
  });

// app.listen(PORT, () => {
//   console.log(`server is listening on http://localhost:${PORT}`);
// });

// app.get("/", (req, res) => {
//   res.send("All good");
// });
