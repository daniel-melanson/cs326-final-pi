import { Router } from "express";
import prisma from "../db";

export const buildings = Router();

buildings.get("/", (req, res) => {
  res.status(404).end();
});

buildings.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).end();
  }

  try {
    const building = await prisma.building.findFirst({
      where: { id },
    });

    if (building) {
      return res.status(200).json(building).end();
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    return res.status(500).end();
  }
});
