# Team &Pi;: Campus Meet - Milestone 3

## Database Implementation

- We have deployed a PostgreSQL database using `render.com/`
- Using Prisma, we have defined and deployed the following schema:

```prisma
model Building {
  id      String @id
  name    String @db.VarChar(255)
  address String
  rooms   Room[]
}

model Room {
  id          String   @id @unique
  building    Building @relation(fields: [buildingId], references: [id])
  buildingId  String
  number      String
  Event       Event[]
  capacity    Int
  description String
  layout      String
  category    String
}

model Event {
  id           Int     @id @default(autoincrement())
  liveId      Int
  room         Room     @relation(fields: [roomId], references: [id])
  roomId       String
  title        String   @db.VarChar(255)
  startTime    DateTime
  endTime      DateTime
  owner        User     @relation(fields: [ownerId], references: [id])
  ownerId      Int
  organization String
  type         String
  categories   String
  creationDate DateTime
  state        String
}

model User {
  id        Int     @id @default(autoincrement())
  firstName String  @db.VarChar(64)
  lastName  String  @db.VarChar(64)
  email     String  @unique
  hash      String
  Events    Event[]
}

model Session {
  id        String   @id
  sid       String   @unique
  data      String
  expiresAt   DateTime
}
```

- Not all fields in the schema are migrated to the database
- As an example, a `Room` has a foreign key to a `Building`
- The backwards relation is documented (`Building` having many rooms) but there is no database constraint that manages it
- Each team member has successfully connected to the database and was able to query/insert/delete/update data
- Currently we are in the process of seeding the database with valid data

## Back-end Functionality

- Unlike other applications, the majority of our data is generated from a third-party API - not from users
- This API contains a lot of "dirty" data that is not pleasant to work with and is not always consistent
- We are currently in the process of trying to clean that data up so that our end users have a nice experience on the client
- We have implemented endpoints using our database model and serialization process
- However, data is not fully present yet so client is less functional than previous milestone
- But with clean data, and minor changes, we should have full data interactions

## Deployment

We have switch from Heroku to render because our client and server are decoupled and Heroku was annoying to try and subvert that

## Additional Workings

- Because we some client stuff is blocked until we have clean data other group members focused on sessions
- Hooked login and signup pages with backend and create user entries in DB, create sessions, and provide protections to privileged routes

## Division of Labor

- [Daniel Melanson](https://github.com/daniel-melanson)
  - Home/Login/Signup page html/style
  - Routing for home, login, signup, listings, building, and room pages
  - Connecting RESTful endpoints to DB
  - Authentication and sessions
- [Anthony Zalev](https://github.com/AnthonyZalev)
  - Database Schema work
  - Created Routine for scraping 25live and populating server database
- [Veera Sivarajan](https://github.com/veera-sivarajan)
  - Login page
