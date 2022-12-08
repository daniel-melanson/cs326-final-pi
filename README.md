# Team &Pi;: Campus Meet

## Overview

Have you ever been on campus, the library was closed, and wanted to find an available space for you and a group to do work or activities? This is was we, the developers of Campus-meet, asked ourselves and we set out to find a solution.

At the core of campus-meet, we present all rooms that are potentially empty from occupation and available for use. All in a easy to use interface. Furthermore, we allow users on our platforms to save and reserve available rooms for their own informal events, ensuring that no other user on the platform show up to the room they've chosen.

## How

### Data collection and storage

School event data is scraped from the 25Live UMass calendar at: <https://25live.collegenet.com/pro/umass#!/home/calendar>. This data is scraped asynchronously to our database, which provides a much faster response time than this legacy software.

We then use a Prisma-managed PostgreSQL database to store the information. Prisma gives us the querying ease of MongoDB while giving the relational safety of SQL. We store our data in four main tables: one for users, rooms, buildings, and events.

### API

There is a lot of communication between the client and server. All of which is handled by our API.

#### Authentication

Our authentication API has separate end points for checking authentication, logging in, logging out, and signing up.

#### Availabilities

Our availabilities API reviews given filters and return a list of available rooms
at a variety of times to browse through.

#### Buildings and Rooms

Our buildings API at application load returns a list of all buildings. The rooms API then can return a list of rooms in a building, or can return the events that take place in a given room.

#### Reservations

The reservation API has create, read, update, and delete functionality for users as they book and manage their event reservations.

#### Events

The event API returns details of a specific event id.

## Who

- [Daniel Melanson](https://github.com/daniel-melanson)
- [Veera Sivarajan](https://github.com/veera-sivarajan)
- [Anthony Zalev](https://github.com/AnthonyZalev)

## TODO

- [ ] Test crud endpoints
  - D
  - A
  - So database is populated for grading
  - Drop old ones
- [ ] Page for events (`frontend/scr/pages/events.tsx`)
  - D
  - UI for displaying information about events the currently logged in user created
  - UI for updating information about the event if the logged in user is the event creator
    - Hook with API
- [ ] `docs/final.md` and `docs/setup`
  - <https://docs.google.com/document/d/1zdw0vNJXx6sFG660pi8K8ETqm51jtXA3JnhxRa6Wxsc/edit>#
- [ ] Video Demo
  - Anthony
  - <https://docs.google.com/document/d/1zdw0vNJXx6sFG660pi8K8ETqm51jtXA3JnhxRa6Wxsc/edit>#
