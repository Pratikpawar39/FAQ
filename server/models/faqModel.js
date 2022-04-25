const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({
    category:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true,
        minlength : 9,
    },
    answer: {
        type: String,
        required: true,
        minlength :9,
    }
},{
    timestamps: true,
});

const Faq = mongoose.model('faqs',faqSchema);

module.exports = Faq;