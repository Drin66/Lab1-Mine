import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from "multer";

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/images', express.static('uploads'));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"petshop"
});

app.use(express.json());
app.use(cors())

// const storage = multer.memoryStorage();
  
//   const uploadM = multer({ storage: storage });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + "_" + Date.now() + Path.extname(file.originalname));
    }
})

const uploadM = multer({ storage: storage });

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ error: 'Multer error', details: err });
    } else if (err) {
      // An unknown error occurred.
      return res.status(500).json({ error: 'Unknown error', details: err });
    }
    next();
  });
  

app.get("/", (req,res) => {
    res.send("<h1>hello this is the backend</h1>");
});

app.get("/users", (req,res) => {
    const q = "SELECT * FROM user";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users", (req,res) => {
    const q = "INSERT into user (`name`,`surname`,`email`,`username`,`password`,`number`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.username,
        req.body.password,
        req.body.number
    ];

    db.query(q, values, (err,data) => {
        if(err) return res.json(err);
        return res.json("user has been created successfully");
    });
});

// app.post("/register", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
  
//     bcrypt.hash(password, saltRounds, (err, hash) => {
//       if (err) {
//         console.log(err);
//       }
  
//       db.query(
//         "INSERT into user (`name`,`surname`,`email`,`username`,`password`,`number`) VALUES (?)",
//         [username, hash],
//         (err, result) => {
//           console.log(err);
//         }
//       );
//     });
//   });

// app.get("/login", (req, res) => {
//     res.send("<h1>Login page</h1>");
// });

app.post("/login", (req, res) => {
    // const username=req.body.username;
    // const password=req.body.password;

    const q = "SELECT * FROM user WHERE username = ? AND password = ?";
    // const values = [
    //     req.body.username,
    //     req.body.password
    // ]
    db.query(q, [req.body.username, req.body.password], (err, data) => {
    // db.query(q, [values], (err, data) => {
        if(err) return res.json("login failed(Error)");
        if(data.length > 0){
            return res.json("Login successfully");
        } else {
            return res.json("No such data in the database");
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

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM `user` WHERE `id` = ?";
    
    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching user", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "User not found::)" });
        }
        return res.json(data[0]);
    });
});

app.put("/users/:id", (req,res) => {
    const userId = req.params.id;
    const q = "UPDATE user SET `name`=?, `surname`=?, `email`=?, `username`=?, `password`=?, `number`=? WHERE id=? ";

    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.username,
        req.body.password,
        req.body.number
    ];
    
    db.query(q, [...values,userId], (err,data) => {
        if(err) return res.json(err);
        return res.json("User has been updated successfully.");
    });
});

//per produktet
app.get("/produktet", (req,res) => {
    const q = "SELECT * FROM produktet";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/produktet", uploadM.single('foto'), (req, res) => {
    const q = "INSERT INTO produktet (`emri`,`pershkrimi`,`foto`,`cmimi`) VALUES (?, ?, 'iph.jpg', ?)";
    const values = [
        req.body.emri,
        req.body.pershkrimi,
        req.body.cmimi
    ];
    db.query(q, values,  (err, data) => {
        if (err) return res.status(500).json({ error: "Error creating product", details: err });
        return res.json("Product created successfully");
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
    const q = "UPDATE produktet SET `emri`=?, `pershkrimi`=?, `foto`=?, `cmimi`=?, `category_id`=? WHERE id=? ";

    const values = [
        req.body.emri,
        req.body.pershkrimi,
        req.body.foto,
        req.body.cmimi,
        req.body.category_id,
        produktId
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: "Error updating product", details: err });
        return res.json("Product updated successfully");
    });
});

app.get("/produktet/:id", (req, res) => {
    const produktId = req.params.id;
    const q = "SELECT * FROM `produktet` WHERE `id` = ?";
    
    db.query(q, [produktId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching product", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json(data[0]);
    });
});
//per Animals
app.get("/animals", (req,res) => {
    res.send("<h1>hello this is the backend Animals part</h1>");
});

//PER NUMER TE TELEFONIT
app.get("/number", (req,res) => {
    const q = "SELECT * FROM pnumber";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});
app.post("/number", (req,res) => {
    const q = "INSERT into pnumber (`phone_number`,`prefix`,`country`,`user_id`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.phone_number,
        req.body.prefix,
        req.body.country,
        req.body.user_id
    ];
    db.query(q, values,  (err, data) => {
                if(err) return res.json(err);
                return res.json("Number has been created successfully");
            });
});

// app.post("/addnumber", (req, res) => {
//     const q = "INSERT INTO pnumber (`phone_number`,`prefix`,`country`,`user_id`) VALUES (?, ?, ?, ?)";
//     const values = [
//         req.body.phone_number,
//         req.body.prefix,
//         req.body.country,
//         req.body.user_id
//     ];
//     db.query(q, values,  (err, data) => {
//         if(err) return res.json(err);
//         return res.json("Number has been created successfully");
//     });
//   });

app.delete("/number/:phone_number", (req,res) => {
    const numberId = req.params.phone_number;
    const q = "DELETE FROM pnumber WHERE phone_number = ?";
    
    db.query(q, [numberId], (err,data) => {
        if(err) return res.json(err);
        return res.json("Number has been deleted successfully.");
    });
});

app.get("/number/:phone_number", (req, res) => {
    const numberId = req.params.phone_number;
    const q = "SELECT * FROM `pnumber` WHERE `phone_number` = ?";
    
    db.query(q, [numberId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching number", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Number not found::)" });
        }
        return res.json(data[0]);
    });
});

app.put("/number/:phone_number", (req,res) => {
    const phnumber = req.params.phone_number;
    const q = "UPDATE pnumber SET `prefix`=?, `country`=?, `user_id`=? WHERE phone_number=? ";

    const values = [
        req.body.prefix,
        req.body.country,
        req.body.user_id,
        phnumber
    ];
    
    db.query(q, values, (err,data) => {
        if(err) return res.status(500).json({ error: "Error updating number", details: err });
        return res.json("Number has been updated successfully.");
    });
});

//PER CATEGORIES
app.get("/categories", (req,res) => {
    const q = "SELECT * FROM categories";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/categories", (req,res) => {
    const q = "INSERT into categories (`name`) VALUES (?)";
    const values = [
        req.body.name,

    ];
    db.query(q, values,  (err, data) => {
                if(err) return res.json(err);
                return res.json("Category has been created successfully");
            });
});

app.delete("/categories/:id", (req,res) => {
    const Id = req.params.id;
    const q = "DELETE FROM categories WHERE id = ?";
    
    db.query(q, [Id], (err,data) => {
        if(err) return res.json(err);
        return res.json("Category has been deleted successfully.");
    });
});

app.get("/categories/:id", (req, res) => {
    const Id = req.params.id;
    const q = "SELECT * FROM `categories` WHERE `id` = ?";
    
    db.query(q, [Id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching Category", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Category not found::)" });
        }
        return res.json(data[0]);
    });
});

app.put("/categories/:id", (req,res) => {
    const cid = req.params.id;
    const q = "UPDATE categories SET `name`=? WHERE id=? ";

    const values = [
        req.body.name,
        cid
    ];
    
    db.query(q, values, (err,data) => {
        if(err) return res.status(500).json({ error: "Error updating Category", details: err });
        return res.json("Category has been updated successfully.");
    });
});


app.listen(3003, () => {
    console.log("connected to backend!");
});
