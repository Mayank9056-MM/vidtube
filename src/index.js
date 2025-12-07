import "dotenv/config";
import { app } from "./app.js";
import connectDB, { getDBStatus } from "./db/index.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `App is listening on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
    console.log("Database connection status:", getDBStatus());
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
