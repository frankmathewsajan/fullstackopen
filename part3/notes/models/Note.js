const mongoose = require("mongoose");

require('dotenv').config();


const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false)
mongoose.connect(url).then(r => console.log(r.toString()))

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v

    }
})

module.exports = mongoose.model('Note', noteSchema)