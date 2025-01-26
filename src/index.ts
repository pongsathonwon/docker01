import express from "express"
import { appRoute } from "./routes";


const app = express();
app.use("/api", appRoute);
app.listen(3000, () => {
  console.log("app running on port 3000");
})


