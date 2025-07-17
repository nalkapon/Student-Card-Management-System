const SyllabusSingleton = require('../utils/SyllabusSingleton');

exports.setSyllabus = (req, res) => {
    const syllabusData = req.body;
    SyllabusSingleton.setSyllabus(syllabusData);
    res.status(200).send({ message: 'Syllabus verisi Singleton üzerinden güncellendi.' });
};

exports.getSyllabus = (req, res) => {
    const data = SyllabusSingleton.getSyllabus();
    res.status(200).json(data);
};