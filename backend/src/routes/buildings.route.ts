import { Router } from "express";

export const buildings = Router();

const STUB_BUILDING_DATA: Record<string, string[]> = {
  "Integrative Learning Center": ["S151", "125", "225", "300"],
  "Integrated Sciences Building": ["105", "750", "753", "753"],
};

buildings.get("/", (req, res) => {
  res.status(200).json(Object.keys(STUB_BUILDING_DATA)).end();
});

buildings.get("/:id/rooms", (req, res) => {
  res.status(200).json(STUB_BUILDING_DATA[req.params.id]).end();
});
