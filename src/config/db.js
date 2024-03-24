const mongoose = require("mongoose");
const connect=() => {
    return mongoose.connect("mongodb+srv://tiagozdo:1erVbalqEFL0baU8@cluster0.fxtrt8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports=connect;


