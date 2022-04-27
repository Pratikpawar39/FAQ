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
        .then(() => res.json('FAQ created!'))
        .catch((err) => res.status(400).json('Error: ' + err))
})

//--> get FAQ by id
router.route('/:id').get((req, res) => {
    Faq.findById(req.params.id)
        .then(fData => res.json(fData))
        .catch(err => res.status(400).json('Error: ' + err));
});

//--> delete FAQ by id
router.route('/:id').delete((req, res) => {
    Faq.findByIdAndDelete(req.params.id)
        .then(() => res.json('FAQ deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//--> update FAQ by id
router.route('/update/:id').post((req, res) => {
    Faq.findById(req.params.id)
        .then(fData => {
            fData.category = req.body.category;
            fData.question = req.body.question;
            fData.answer = req.body.answer;

            fData.save()
                .then(() => res.json('FAQ updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;