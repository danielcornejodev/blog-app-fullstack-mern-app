const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates a new instance of a schema object. Schema is what defines the structure of the document in your collection. 
//second argument is a bit like an options object. In this cause timestamps auto calculates the time and will include in the blog.
//next we need to create a model. Model surrounds the schema and provides us with an interface by which to communicate with a database collection.
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
}, { timestamps: true });

//First argument in model looks for the plural of the string you enter and looks for that database name when it connects. 
//Second argument is the schema we want to base this model on.
const Blog = mongoose.model('Blog', blogSchema);

//Must export mdoel module 
module.exports = Blog;