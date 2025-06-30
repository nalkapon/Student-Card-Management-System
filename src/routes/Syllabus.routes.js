module.exports = (app) => {
    const syllabus = require('../controllers/Syllabus.controller');
    app.post('/syllabus', syllabus.setSyllabus);  // syllabus’ı ayarla
    app.get('/syllabus', syllabus.getSyllabus);   // syllabus’ı getir (Singleton)
};
