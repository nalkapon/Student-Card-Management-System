const SyllabusSingleton = require('../utils/SyllabusSingleton');

// Syllabus verisini ayarla (admin paneli vs.)
exports.setSyllabus = (req, res) => {
    const syllabusData = req.body;
    SyllabusSingleton.setSyllabus(syllabusData);
    res.status(200).send({ message: 'Syllabus verisi Singleton üzerinden güncellendi.' });
};

// Syllabus verisini al (frontend burayı kullanır)
exports.getSyllabus = (req, res) => {
    const data = SyllabusSingleton.getSyllabus();
    res.status(200).json(data);
};
