import express from "express";
import { buildings } from "./routes/buildings.route";
import { events } from "./routes/events.route";

const app = express();
app.use(express.json());
app.use("/", express.static("../frontend/dist/"))

const api = express.Router();
api.use("/buildings", buildings);
api.use("/events", events);

app.use("/api", api);

const EXPRESS_PORT = 8000;
app.listen(EXPRESS_PORT, () =>
  console.log("Server listening on port " + EXPRESS_PORT)
);
