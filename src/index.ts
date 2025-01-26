import express from "express"
import { contactRoute } from "./routes";


try {

  const app = express();


  app.use("/api", contactRoute);

  app.listen(3000, () => {
    console.log("app running on port 3000");
  })
} catch (err) {
  console.log(err)
}

