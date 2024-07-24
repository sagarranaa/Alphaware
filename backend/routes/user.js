const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Job = require("../models/Job");
const User = require("../models/User");
const router = express.Router();

// Get all jobs a user has applied to
router.get("/applied-jobs", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user.appliedJobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Apply for a job
router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (user.appliedJobs.includes(req.params.jobId)) {
      return res.status(400).json({ msg: "Already applied for this job" });
    }

    user.appliedJobs.push(req.params.jobId);
    await user.save();

    res.json({ msg: "Job applied successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
