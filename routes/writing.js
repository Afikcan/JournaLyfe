const pool = require("../database");
const router = require("express").Router();
const { uploadFile, getFileStream, downloadImage } = require("../utils/s3")
const { createImageByText } = require("../utils/openai")

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION

// posting writings and generating ai image
router.post('/post', async (req, res) => {
  const { user_id, title, content, published, color} = req.body;
  console.log(1)
  try {
    // Insert writing into database
    const writingResult = await pool.query(
      `INSERT INTO "writings" (user_id, title, content, published, color) VALUES ($1, $2, $3, $4, $5) RETURNING writing_id`,
      [user_id, title, content, published, color]
    );
    const writing_id = writingResult.rows[0].writing_id;
    console.log(2)
    
    // Generate an image based on the content
    const generatedImageUrl = await createImageByText(content);

    console.log(generatedImageUrl)
    //const generatedImageUrl = "https://journal-lyfe-images.s3.eu-west-3.amazonaws.com/journlyfe_logo.png"

    console.log(3)

    const imageStream = await downloadImage(generatedImageUrl);
    
    const filename = `user_${user_id}_writing_${writing_id}.png`;
    console.log(4)

    // Upload the image to S3
    const uploadResult = await uploadFile(imageStream, filename);
    
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${filename}`;
    console.log(5)
    
    res.status(200).json({imageUrl, writing_id});
  } catch (error) {
    console.error('Error in /post route:', error);
    res.status(500).send('Server error: ' + error.message);
  }
});

// geting all published data for our blog page
router.get('/getAllPublished', async (req, res) => {
  try {
    // Query to select all writings from the database
    const allWritings = await pool.query("SELECT * FROM writings WHERE published = true");

    // Send the retrieved writings as a JSON response
    res.json(allWritings.rows);
  } catch (error) {
    // If there's an error, send a 500 server error response
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// get writings by userId, 
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

