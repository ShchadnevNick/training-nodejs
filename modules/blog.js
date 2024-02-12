const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//установка схемы
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Создаем модель
const Blog = mongoose.model('Blog', blogSchema); 
module.exports = Blog;


