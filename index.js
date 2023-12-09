import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

// CONNECTING TO DATABASE
connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`\n Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
