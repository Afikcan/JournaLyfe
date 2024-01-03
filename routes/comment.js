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


router.post("/", async (req, res) => {
  try {
      const { user_id, content, writing_id, username } = req.body;
      const newComment = await pool.query(
          "INSERT INTO comments (user_id, content, writing_id, username) VALUES ($1, $2, $3, $4) RETURNING *",
          [user_id, content, writing_id, username]
      );

      res.json(newComment.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});


module.exports = router;