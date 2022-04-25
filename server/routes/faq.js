const router = require('express').Router();
const Faq = require('../models/faqModel');

//apis
router.route('/').get((req, res)=> {
    Faq.find()
    .then(faq => res.json(faq))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const faq = req.body.faq;

    const newFaq = new Faq({
        category,
        question,
        answer
    });
    
    newFaq.save()
    .then(() => res.json('Faq created!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router;