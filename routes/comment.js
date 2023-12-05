const pool = require("../database");
const router = require("express").Router();

router.get("/:writingId", async (req, res) => {
    try {
      const { writingId } = req.params;
      const comments = await pool.query(
        "SELECT * FROM comments WHERE writing_id = $1",
        [writingId]
      );
  
      res.json(comments.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports = router;