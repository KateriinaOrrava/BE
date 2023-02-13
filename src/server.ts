/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
const mysql = require("mysql2");
const app = express();
const expressValidator = require("express-validator");

const db = mysql.createConnection({
  multipleStatements: true,
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "123456",
  database: "Blog",
  port: 3306,
});

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works, Kate!");
});

db.connect();

// just for test
app.get("/", (req: Request, res: Response) => {
  res.send("Application works, Kate!");
});

// just for test
app.get("/love", (req: Request, res: Response) => {
  res.send("You are strong, Kate!");
});

// paņem visus posts
app.get("/posts", (req: Request, res: Response) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// paņem visus comments
app.get("/comments", (req: Request, res: Response) => {
  const q = "SELECT * FROM comments";
  db.query(q, (err, data) => {
    if (err) throw err;
    res.send({ data });
  });
});

// paņem visus comments
app.get("/comments/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const q = `SELECT * FROM comments WHERE postId = ${id};`;
  db.query(q, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// paņem vienu post
app.get(`/posts/:id`, (req: Request, res: Response) => {
  const id = req.params.id;
  const q = `SELECT * FROM posts WHERE id = ${id};`;
  db.query(q, (err, data) => {
    if (err) throw err;
    res.send(data[0]);
  });
});

// strādā
app.post(`/add`, (req: Request, res: Response) => {
  const q = `INSERT INTO posts (img, title, descr) VALUES (?);`;
  const values = [req.body.img, req.body.title, req.body.descr];
  db.query(q, [values], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
// pievienot komentāru
app.post(`/addComment`, (req: Request, res: Response) => {
  const q = `INSERT INTO comments (userImage, userName, userDescr, postId) VALUES (?);`;
  const values = [
    req.body.userImage,
    req.body.userName,
    req.body.userDescr,
    req.body.postId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

//šīs nestrādā

// app.delete("/posts/:id", (req: Request, res: Response) => {
//   const doubledQ = `DELETE FROM comments WHERE postId = ${req.params.id}; DELETE FROM posts WHERE id = ${req.params.id};`;
//   db.query(doubledQ, (err, data) => {
//     if (err) throw err;
//     return res.send("deleted" + data);
//   });
// });

// app.delete("/posts/:id", (req: Request, res: Response) => {
//   const doubledQ = `DELETE FROM comments WHERE postId = ${req.params.id};/n DELETE FROM posts WHERE id = ${req.params.id};`;
//   db.query(doubledQ, (err, data) => {
//     if (err) throw err;
//     return res.send("deleted" + data);
//   });
// });

app.delete("/posts/:id", (req: Request, res: Response) => {
  const doubledQ = `DELETE FROM comments WHERE postId = ${req.params.id}; DELETE FROM posts WHERE id = ${req.params.id};`;
  db.query(doubledQ, (err, data) => {
    if (err) throw err;
    return res.send("deleted" + data);
  });
});

// app.delete("/posts/:id", (req: Request, res: Response) => {
//   const q1 = `DELETE FROM comments WHERE postId = ${req.params.id};`;
//   const q2 = ` DELETE FROM posts WHERE id = ${req.params.id};`;
//   db.query(q1, (err, data) => {
//     if (err) throw err;
//     return res.send("deleted" + data);
//   });
//   db.query(q2, (err, data) => {
//     if (err) throw err;
//     return res.send("deleted" + data);
//   });
// });

// app.delete("/posts/:id", (req: Request, res: Response) => {
//   const q1 = `DELETE FROM comments WHERE postId = ${req.params.id};`;
//   const q2 = ` DELETE FROM posts WHERE id = ${req.params.id};`;
//   db.query([q1, q2], (err, data) => {
//     if (err) throw err;
//     return res.send("deleted" + data);
//   });
// });

app.get("/love", (req: Request, res: Response) => {
  res.send("You are strong, Kate!");
});

app.put("/editPost/:id", (req: Request, res: Response) => {
  const q = `UPDATE posts SET img ="${req.body.img}", title="${req.body.title}", descr="${req.body.descr}" WHERE id = ${req.params.id};`;
  const id = req.params.id;
  db.query(q, id, (err, data) => {
    if (err) throw err;
    return res.send("edited" + data);
  });
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
