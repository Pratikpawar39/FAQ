const router = require('express').Router();
const Faq = require('../models/faqModel');

//apis
//--> fetch FAQ from mongo
router.route('/').get((req, res) => {
    Faq.find()
        .then(faq => res.json(faq))
        .catch(err => res.status(400).json('Error: ' + err))
})

//--> create FAQ
router.route('/add').post((req, res) => {
    const category = req.body.category;
    const question = req.body.question;
    const answer = req.body.answer;


    //fetch faq questions for check
    Faq.find({}, { question: 1, _id: 0 })
        .then(questions => {
            console.log("first", questions)

            //check duplicate question
            questions.map(ele => {
                if (ele.question === question) {
                    console.log("Duplicate Question!");
                    return res.status(404).json(`Error: ${question} this question is already exist!`);
                }
            })
        })
        .catch(err => res.status(400).json('Error: ' + err))
    
    const newFaq = new Faq({
        category,
        question,
        answer
    });

    //save faq details
    newFaq.save()
        .then(() => res.json('Faq created!'))
        .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router;