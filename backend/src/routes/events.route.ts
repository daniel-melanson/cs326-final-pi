import { Router } from "express";
import { EVENT_LIST } from "./data";
import { urlBuilder } from "./util";

export const events = Router();

/*
events:

receive JSON OBJECT:

{
  name : <optional> string,
  building : string,
  room : string,
  date: string "dd-mm-yyyy",
  start_hr : integer 0 - 24,
  end_hr : integer 0 - 24 (also greater than start_hr),
  start_min: integer 0 - 60,
  end_min: integer 0 - 60
}


return JSON OBJECT: 

{
  [
    {
      event: string :
      {
        name : string,
        building : string,
        room : string,
        date: string "dd-mm-yyyy",
        start_hr : integer 0 - 24,
        end_hr : integer 0 - 24,
        start_min: integer 0 - 60,
        end_min: integer 0 - 60
     }
   },
    ....
  ]
}



*/
events.get("/:id/", (req, res) => {
  const userURL = urlBuilder("users", req);
  const event = EVENT_LIST.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).end();
  }

  res
    .status(200)
    .json({
      ...event,
      owner_url: userURL(event.owner_id),
    })
    .end();
});
