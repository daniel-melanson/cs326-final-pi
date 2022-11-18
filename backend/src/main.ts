import { config } from "dotenv";
import express from "express";
import { availabilities } from "./routes/availabilities.route";
import { buildings } from "./routes/buildings.route";
import { events } from "./routes/events.route";
import { rooms } from "./routes/rooms.route";
import { sessions } from "./routes/sessions";

config();

const app = express();
app.use("/", express.static("../frontend/dist/"));
app.use(express.json());

const api = express.Router();
api.use("/buildings", buildings);
api.use("/events", events);
api.use("/rooms", rooms);
api.use("/availabilities", availabilities);
api.use("/sessions", sessions);

app.use("/api", api);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server listening on port " + PORT));
