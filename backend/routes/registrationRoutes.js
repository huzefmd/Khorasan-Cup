const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");

router.post("/", async (req, res) => {
  try {
    const existingTeam = await Registration.findOne({
      clubName: req.body.clubName,
    });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team already registered",
      });
    }

    const registration = await Registration.create(req.body);

    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;