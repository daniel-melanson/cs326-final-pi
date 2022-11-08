import { Router } from "express";

export const rooms = Router();

rooms.get("/:id", (req, res) => {
  res
    .status(200)
    .json([
      {
        name: "Integrative Learning Center",
      },
      {
        name: "Integrated Sciences Building",
      },
    ])
    .end();
});

rooms.get("/:id/schedule", (req, res) => {
  res
    .status(200)
    .json([
      {
        name: "Integrative Learning Center",
      },
      {
        name: "Integrated Sciences Building",
      },
    ])
    .end();
});
