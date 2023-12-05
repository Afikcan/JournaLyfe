const pool = require("../database");
const router = require("express").Router();

router.post('/post', async (req, res) => {
  const { user_id, title, content, published } = req.body;
  
  try {
    // Insert writing into database
    const writingResult = await pool.query(
      `INSERT INTO "writings" (user_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING writing_id`,
      [user_id, title, content, published]
    );
    const writing_id = writingResult.rows[0].writing_id;
    
    // Generate an image based on the content
    //const imageUrl = await createImageByText(content);
    const imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-el9OIrLnRgNg6PoU7Er8GU7y/user-xK05CSttDOcKlLqk1BMPilda/img-Ss0ILRm8oQGeIMp7z1qxOB5r.png?st=2023-12-05T13%3A08%3A00Z&se=2023-12-05T15%3A08%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-05T12%3A56%3A44Z&ske=2023-12-06T12%3A56%3A44Z&sks=b&skv=2021-08-06&sig=U1QwPM%2B7eDGMCShWG3842ofE5Kbzu%2BqFi7Ok6IjHzlM%3D"    // Define a unique file name for the image
    
    /*
    const filename = `user_${user_id}_writing_${writing_id}.jpg`;
    // Upload the image to S3
    const uploadResult = await uploadFile(imageStream, filename);
    */
    
    res.status(200).json({imageUrl, writing_id});
  } catch (error) {
    // Handle error
    res.status(500).send('Server error');
  }
});

// get writings by userId
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

  router.get("/getAll", async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM "public"."writings"');
      res.status(200).json({result: rows});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
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

