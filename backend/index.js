import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"petshop"
});

app.use(express.json());
app.use(cors())

app.get("/", (req,res) => {
    res.send("<h1>hello this is the backend</h1>");
});

app.get("/login", (req, res) => {
    // For testing purposes, you can send a simple response indicating that it's a login route
    res.send("<h1>Login page</h1>");
});

app.get("/users", (req,res) => {
    const q = "SELECT * FROM user";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users", (req,res) => {
    const q = "INSERT into user (`name`,`surname`,`email`,`username`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.username,
        req.body.password
    ];

    db.query(q, [values], (err,data) => {
        if(err) return res.json(err);
        return res.json("user has been created successfully");
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.query(q, [email, password], (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        if (data.length === 1) {
            // Successful login
            return res.status(200).json({ success: true, token: 'your_generated_jwt_token' });
        } else {
            // Invalid credentials
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.delete("/users/:id", (req,res) => {
    const userId = req.params.id;
    const q = "DELETE FROM user WHERE id = ?";
    
    db.query(q, [userId], (err,data) => {
        if(err) return res.json(err);
        return res.json("User has been deleted successfully.");
    });
});

app.put("/users/:id", (req,res) => {
    const userId = req.params.id;
    const q = "UPDATE user SET `name`=?, `surname`=?, `email`=?, `username`=?, `password`=? WHERE id=? ";

    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.username,
        req.body.password
    ];
    
    db.query(q, [...values,userId], (err,data) => {
        if(err) return res.json(err);
        return res.json("User has been updated successfully.");
    });
});

//perproduktet
app.get("/produktet", (req,res) => {
    const q = "SELECT * FROM produktet";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/produktet", (req,res) => {
    const q = "INSERT INTO produktet (`emri`,`pershkrimi`,`cmimi`,`foto`) VALUES (?)";
    const values = [
        req.body.emri,
        req.body.pershkrimi,
        req.body.foto,
        req.body.cmimi,
    ];
    db.query(q, [values], (err,data) => {
        if(err) return res.json(err);
        return res.json("produkti u krijua me sukses");
    });
});

app.delete("/produktet/:id", (req, res) => {
    const produktId = req.params.id;
    const query = "DELETE FROM produktet WHERE id = ?";

    db.query(query, [produktId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Product has been deleted successfully.");
    });
});

app.put("/produktet/:id", (req, res) => {
    const produktId = req.params.id;
    const query = "UPDATE produktet SET `emri`=?, `pershkrimi`=?, `cmimi`=?, `foto`=? WHERE id=? ";

    const values = [
        req.body.emri,
        req.body.pershkrimi,
        req.body.cmimi,
        req.body.foto
    ];

    db.query(query, [...values, produktId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Product has been updated successfully.");
    });
});



app.listen(3003, () => {
    console.log("connected to backend!");
});
