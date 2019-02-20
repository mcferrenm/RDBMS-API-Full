const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig);
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving students" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await db("students")
      .join("cohorts", "students.cohort_id", "=", "cohorts.id")
      .select("students.id", "students.name", { cohort: "cohorts.name" })
      .where({ "students.id": req.params.id })
      .first();
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving student" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "Must provide name to create student" });
    } else {
      const [id] = await db("students").insert(req.body);
      const created = await db("students")
        .where({ id })
        .first();
      res.status(201).json(created);
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating student" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting student" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const student = await db("students")
        .where({ id: req.params.id })
        .first();
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating student" });
  }
});

module.exports = router;
