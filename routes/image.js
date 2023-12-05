const router = require("express").Router();
const pool = require("../database");

const { uploadFile, getFileStream } = require("../utils/s3")
const { createImageByText } = require("../utils/openai")

const multer = require('multer')
const upload = multer({ dest: 'images/' })

// get image by writingId
router.get("/:writingId", async (req, res) => {
  try {
    const { writingId } = req.params;
    const images = await pool.query(
      "SELECT * FROM images WHERE writing_id = $1",
      [writingId]
    );

    res.json(images.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// post image meta data
router.post('/postImage',  async (req, res) => {
  try {
    const { user_id, content, imageUrl, writing_id, published } = req.body;
    const imagesResult = await pool.query(
      `INSERT INTO "images" (user_id, image_prompt, published, link, writing_id) VALUES ($1, $2, $3, $4, $5)`,
      [user_id, content, published, imageUrl, writing_id]
    );
    
    
    res.status(200).send("nice")
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get image from s3
router.get('/get/:key',  async (req, res) => {
    try {
        const key = req.params.key
        const readStream = getFileStream(key)

        readStream.pipe(res)
    } catch (error) {
      console.error('Error: uploading image to AWS S3 Bucket:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// upload image to s3
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        console.log(file);

        const result = await uploadFile(file);
        console.log(result);

        res.send({imagePath: `/images/${result.Key}`});
    } catch (error) {
      console.error('Error: uploading image to AWS S3 Bucket:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



/*
router.post("/gemerateImage", async (req, res) => {
  try {
    const prompt = req.body.prompt
    const result = createImageByText(prompt)
    res.send(result);
  } catch (err) {
    console.error(err.message);
  }
});
*/



module.exports = router;