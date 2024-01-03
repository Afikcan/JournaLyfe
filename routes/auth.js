const pool = require("../database");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const auth = require("../middleware/auth");
const generateJWT = require("../utils/generateJWT");

// create a user
router.post('/register', validInfo, async (req, res) => {
    try {
        // Extract user data from the request body
        const { username ,password, name ,surname ,email ,date_of_birth } = req.body;
        const creditCount = req.body.credit_count || 5;
        const currentDate = new Date().toISOString().split('T')[0];
        const sub_tier = req.body.sub_tier || "free";

        // Enclose the email value in single quotes in the SQL query
        const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);

        if (user.rows.length !== 0) {
        return res.status(401).json({ message: 'Email is already in use.'});
        }

        console.log(req.body)
                    

        // hash the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Insert user data into the "user" table
        const insertUserQuery = `
        INSERT INTO "user" (username, password, name, surname, email, date_of_birth, credit_count, sub_tier, last_credit_update)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING user_id, username, email
        `;

        const values = [username, hashedPassword, name, surname, email, date_of_birth, creditCount, sub_tier, currentDate];
        const { rows } = await pool.query(insertUserQuery, values);


        // generating web token
        const token = generateJWT(rows[0].user_id);
        const userId = rows[0].user_id;

        res.json({ token, userId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post("/login", validInfo, async (req, res) => {
    try {
        // deconstruct the req.body
        const { email, password } = req.body;

        // check if user exists
        const user = await pool.query('SELECT * FROM "user" WHERE email = $1;', [
        email,
        ]);
        if (user.rows.length === 0) {
          return res.status(401).json("Password or email is incorrect.");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
          return res.status(401).json("Password or email is incorrect.");
        }
        
        const token = generateJWT(user.rows[0].user_id);
        const userId = user.rows[0].user_id;

        const currentDate = new Date();
        if (currentDate - user.last_credit_update > 30 * 24 * 60 * 60 * 1000) {
            await pool.query(
                'UPDATE "user" SET credit_count = credit_count + 5, last_credit_update = $1 WHERE user_id = $2',
                [currentDate, user.user_id]
            );
        }

        res.json({ token, userId });
    } catch (err) {
        console.error(err.message);
    }
  });

  router.get("/verify", auth, async (req, res) => {
    try {
      const response = {
        isAuth: true,
        userId: req.userId,
      };
  
      res.json(response);
    } catch (err) {
      console.error(err.message);
    }
  });

  module.exports = router;