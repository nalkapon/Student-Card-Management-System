let instance = null;

class SyllabusSingleton {
    constructor() {
        if (instance) return instance;
        this.syllabusData = [];
        instance = this;
    }

    setSyllabus(data) {
        this.syllabusData = data;
    }

    getSyllabus() {
        return this.syllabusData;
    }
}

module.exports = new SyllabusSingleton();
