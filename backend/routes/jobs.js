const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Job = require("../models/Job");
const router = express.Router();

// Create Job
router.post(
  "/create",
  [
    auth,
    [
      check("company", "Company name is required").not().isEmpty(),
      check("position", "Position is required").not().isEmpty(),
      check("contract", "Contract type is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, position, contract, location } = req.body;

    try {
      const newJob = new Job({
        company,
        position,
        contract,
        location,
        createdBy: req.user.id,
      });

      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Get all Jobs
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", ["name", "email"]);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Job
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    // Check user
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await job.remove();
    res.json({ msg: "Job removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
