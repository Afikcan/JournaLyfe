const pool = require("../database");
const router = require("express").Router();

router.get("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const writings = await pool.query(
        "SELECT * FROM writings WHERE user_id = $1",
        [userId]
      );
  
      res.json(writings.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.put('/changePublishedStatus/:writingId', async (req, res) => {
    try {
      const { writingId } = req.params;
      const { newPublishedStatus } = req.body;

      console.log(req.body)
  
      // Assuming you have a 'writings' table with a 'published' column
      const update = await pool.query(
        "UPDATE writings SET published = $1 WHERE writing_id = $2 RETURNING *",
        [newPublishedStatus, writingId]
      );
      
  
      res.json(update.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;

