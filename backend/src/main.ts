import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { PORT, SECRET } from './env.js';
import auth from './routes/auth.route.js';
import { availabilities } from './routes/availabilities.route.js';
import { buildings } from './routes/buildings.route.js';
import { events } from './routes/events.route.js';
import { reservations } from './routes/reservations.route.js';
import { rooms } from './routes/rooms.route.js';

const app = express();
app.use(express.static('../frontend/dist/'));

app.use(express.json());

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: {
      maxAge: 7 * DAY,
    },
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * MINUTE,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const api = express.Router();

api.use('/buildings', buildings);
api.use('/events', events);
api.use('/rooms', rooms);
api.use('/availabilities', availabilities);
api.use('/auth', auth);
api.use('/reservations', reservations);

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile('frontend/dist/index.html', { root: '..' });
});

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
