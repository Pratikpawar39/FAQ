const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//middlewares
app.use(cors());
app.use(express.json());

//mongoose connection
const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/faq';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }//useCreateIndex: true 
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//routes
const faqRouter = require('./routes/faq');
const usersRouter = require('./routes/users');

app.use('/faq', faqRouter);
app.use('/users', usersRouter);

//listening on
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
