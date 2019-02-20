const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig);
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cohorts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ error: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cohort" });
  }
});

router.post("/", async (req, res) => {
  try {
    // validate body for name
    const [id] = await db("cohorts").insert(req.body);

    const created = await db("cohorts")
      .where({ id })
      .first();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Error creating cohort" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting cohort" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "Must provide a name to update cohort" });
    } else {
      const count = await db("cohorts")
        .where({ id: req.params.id })
        .update(req.body);
      if (count > 0) {
        const cohort = await db("cohorts")
          .where({ id: req.params.id })
          .first();
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ error: "Cohort no found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating cohort" });
  }
});

module.exports = router;
