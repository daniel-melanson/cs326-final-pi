import { PORT } from 'env';
import express from 'express';
import { availabilities } from 'routes/availabilities.route';
import { buildings } from 'routes/buildings.route';
import { events } from 'routes/events.route';
import { rooms } from 'routes/rooms.route';

const app = express();
app.use('/', express.static('../frontend/dist/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = express.Router();
api.use('/buildings', buildings);
api.use('/events', events);
api.use('/rooms', rooms);
api.use('/availabilities', availabilities);

app.use('/api', api);

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
