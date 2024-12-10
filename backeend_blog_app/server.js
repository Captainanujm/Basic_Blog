import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { config } from "dotenv";
config();
const app=express();
const port=3000;
app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
db.connect((err)=>{
    if(err){
            console.log(err);
    }else{
        console.log("connection created");
    }
})
app.get("/api/posts",(req,res)=>{
    db.query("SELECT * FROM posts ORDER BY created_at DESC",(err,results)=>{
        if(err){
           res.status(500).send("Server error");
        }
        else{
            res.json(results);
        }
    })
});
app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
        if (err) {
            console.error('Error fetching post:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.length === 0) {
            return res.status(404).send('Post not found');
        }
        res.json(results[0]);
    });
});
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
