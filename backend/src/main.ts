import { config } from "dotenv";
import express from "express";
import { buildings } from "./routes/buildings.route";
import { events } from "./routes/events.route";

config();

const app = express();
app.use(express.json());
app.use("/", express.static("../frontend/dist/"));

const api = express.Router();
api.use("/buildings", buildings);
api.use("/events", events);

app.use("/api", api);

const EXPRESS_PORT = process.env.PORT;
app.listen(EXPRESS_PORT, () => console.log("Server listening on port " + EXPRESS_PORT));
