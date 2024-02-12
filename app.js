// подключение express
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const Blog = require('./modules/blog');

// создаем объект приложения
const app = express();

// Connect to BD
mongoose.connect('mongodb://localhost/nots-tutes')
    .then(() => app.listen(3000))
    .catch(e => console.log(e));

// register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({}));

// const blogs = [
//     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
// ];
// res.render('index', {title: 'Home', blogs});

app.get("/", (req, res) => {
    res.redirect('/blogs');
});

app.get("/about", (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});


