import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { authUser } from './controllers/auth.js';
import prisma from './db/index.js';
import { PORT, SECRET } from './env.js';
import { availabilities } from './routes/availabilities.route.js';
import { buildings } from './routes/buildings.route.js';
import { events } from './routes/events.route.js';
import { rooms } from './routes/rooms.route.js';

const app = express();
app.use('/', express.static('../frontend/dist/'));
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

passport.use(
  new Strategy(
    {
      usernameField: 'email',
    },
    authUser,
  ),
);

passport.serializeUser((user, done) => {
  done(undefined, user);
});

passport.deserializeUser(async (email: string, done) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email },
    });

    done(undefined, user);
  } catch (e) {
    done(e);
  }
});

const api = express.Router();

api.use('/buildings', buildings);
api.use('/events', events);
api.use('/rooms', rooms);
api.use('/availabilities', availabilities);

app.use('/api', api);

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
