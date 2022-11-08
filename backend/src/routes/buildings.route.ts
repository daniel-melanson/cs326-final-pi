import { Router } from "express";

export const buildings = Router();

buildings.get("/", (req, res) => {
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
