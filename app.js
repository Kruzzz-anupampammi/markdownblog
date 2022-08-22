const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require('./routes/articles');
const Article = require("./models/article")
const methodOverride = require("method-override")


const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


mongoose.connect("mongodb://localhost/blog", { useNewUrlParser:true });

app.get("/", async (req,res) => {
   const articles = await Article.find().sort({ date: 'desc' })
    res.render('articles/index', {articles: articles});
})


app.use('/articles', articleRouter);


app.listen(3000, function(req,res){
    console.log("Listening on port 3000");
})