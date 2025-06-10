import express from "express";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import cors from "cors";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();//add data base

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // React app
  credentials: true // for cookie
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, message: "Unauthorized" });
}

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Login failed" });
      }
      return res.json({ success: true, message: "Logged in successfully" });
    });
  })(req, res, next);
});

app.post("/checkemail", async (req, res) => {
  const username = req.body.username;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [username+"@inboxify.ge"]);
  if(result.rows[0]){
    return res.json({ success: false, message: "This username is already used!" });
  }else{
    return res.json({ success: true, message: "This is unique username" });
  }
});

app.post("/register", async (req, res) => {
    const { fName, lName, username, password, confPassword } = req.body; 

    if (password !== confPassword) {
        return res.json({ success: false, message: "Passwords do not match" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.query(
        "INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4)",
        [fName, lName, username+"@inboxify.ge", hashedPassword]
        );

        return res.json({ success: true });
    } catch (err) {
        console.error("Registration error:", err);
        return res.json({ success: false, message: "Something went wrong" });
    }
});

app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.get("/inbox", async (req, res) => {
   if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const result = await db.query(
    "SELECT * FROM emails WHERE recipient_email=$1 AND in_trash=false;",
    [req.user.email]
  )
  
  res.status(201).json({success: true, emails: result.rows});
});

app.get("/trash", async (req, res) => {
   if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const result = await db.query(
    "SELECT * FROM emails WHERE recipient_email=$1 AND in_trash=true;",
    [req.user.email]
  )
  
  res.status(201).json({success: true, emails: result.rows});
});

app.get("/sent", async (req, res) => {
   if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const result = await db.query(
    "SELECT * FROM emails WHERE senders_email=$1 AND draft=false AND in_trash=false;",
    [req.user.email]
  )
  
  res.status(201).json({success: true, emails: result.rows});
});

app.get("/draft", async (req, res) => {
   if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const result = await db.query(
    "SELECT * FROM emails WHERE senders_email=$1 AND draft=true AND in_trash=false;",
    [req.user.email]
  )
  
  res.status(201).json({success: true, emails: result.rows});
});

app.delete('/trash/:id',  async (req, res) => {
  const id = req.params.id;
  try{
    const result = await db.query( "DELETE FROM emails WHERE id = $1", [id] );

    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Item not found' });

    res.json({ success: true, message: "Item deleted" });
  }catch(err){
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
})

app.patch('/inbox/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query( "UPDATE emails SET in_trash = true WHERE id = $1", [id] );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: "Item moved to trash" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ success: false, message: "Error moving item to trash" });
  }
});

app.patch('/restore/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query( "UPDATE emails SET in_trash = false WHERE id = $1", [id] );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: "Item restored" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ success: false, message: "Error restoring item" });
  }
});

// app.post("/register", async (req, res) => {
//     const { fName, lName, username, password, confPassword } = req.body; 

//     if (password !== confPassword) {
//         return res.json({ success: false, message: "Passwords do not match" });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         await db.query(
//         "INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4)",
//         [fName, lName, username+"@inboxify.ge", hashedPassword]
//         );

//         return res.json({ success: true });
//     } catch (err) {
//         console.error("Registration error:", err);
//         return res.json({ success: false, message: "Something went wrong" });
//     }
// });

app.post("/compose", ensureAuthenticated, async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const recipientUser = await db.query("SELECT * FROM users WHERE email = $1", [to]);

    if (recipientUser.rows.length === 0) {
      return res.json({
        success: false,
        message: "Recipient not found"
      });
    }

    const recipient = recipientUser.rows[0];

    await db.query(
      `INSERT INTO emails 
        (senders_name, senders_email, recipient_name, recipient_email, subject, main_text, draft, in_trash)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        `${req.user.fname} ${req.user.lname}`,
        req.user.email,
        `${recipient.fname} ${recipient.lname}`,
        recipient.email,
        subject,
        message,
        false,
        false
      ]
    );

    return res.json({ success: true });

  } catch (err) {
    console.error("Compose error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while sending message"
    });
  }
});

app.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
});

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async function verify(email, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      if (result.rows.length === 0) {
        return cb(null, false, { message: "Email not found" });
      }

      const user = result.rows[0];
      const storedHashedPassword = user.password;

      bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return cb(err);
        }

        if (!isMatch) {
          return cb(null, false, { message: "Incorrect password" });
        }

        return cb(null, user);
      });
    } catch (err) {
      console.error("Strategy error:", err);
      return cb(err);
    }
  })
);


passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});