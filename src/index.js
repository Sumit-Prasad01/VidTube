import dotenv from "dotenv";
import { app } from "./app.js";  
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",  
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {   
    await connectDB();   
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });   
    app.get("/", (req, res) => {
      res.send("Server running successfully.");
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  
  }
};

startServer();
