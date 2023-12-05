const router = require("express").Router();
const pool = require("../database");

const { uploadFile, getFileStream } = require("../utils/s3")

const multer = require('multer')
const upload = multer({ dest: 'images/' })

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



router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        console.log(file);

        const imageName = file.filename;
        const description = req.body.description;

        const result = await uploadFile(file);
        console.log(result);

        res.send({imagePath: `/images/${result.Key}`});
    } catch (error) {
      console.error('Error: uploading image to AWS S3 Bucket:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

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




module.exports = router;