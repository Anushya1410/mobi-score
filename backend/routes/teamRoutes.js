const express = require("express");
const Team = require("../models/Team");
const router = express.Router();

/** ✅ GET all teams */
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams" });
  }
});

/** ✅ POST - Create a new team */
router.post("/", async (req, res) => {
  const { name, logoUrl, players } = req.body;
  try {
    const newTeam = new Team({ name, logoUrl, players });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: "Error creating team" });
  }
});

/** ✅ PUT - Update a team */
router.put("/:id", async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: "Error updating team" });
  }
});

/** ✅ DELETE - Remove a team */
router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team" });
  }
});

/** ✅ POST - Add a player to a team */
router.post("/:teamId/players", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.players.push(req.body);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error adding player" });
  }
});

/** ✅ DELETE - Remove a player from a team */
router.delete("/:teamId/players/:playerId", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.players = team.players.filter(player => player._id.toString() !== req.params.playerId);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error removing player" });
  }
});

module.exports = router;
