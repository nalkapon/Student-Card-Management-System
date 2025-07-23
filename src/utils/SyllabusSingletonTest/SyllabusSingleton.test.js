const SyllabusSingleton = require('../SyllabusSingleton');

describe('Singleton Pattern - SyllabusSingleton', () => {
  test('Should return the same instance every time', () => {
    const instance1 = require('../SyllabusSingleton');
    const instance2 = require('../SyllabusSingleton');
    expect(instance1).toBe(instance2); // aynı referans mı
  });

  test('Should store and retrieve syllabus data', () => {
    const syllabus = ['Math', 'Physics'];
    SyllabusSingleton.setSyllabus(syllabus);
    expect(SyllabusSingleton.getSyllabus()).toEqual(syllabus);
  });

  test('Should maintain shared state across imports', () => {
    const otherInstance = require('../SyllabusSingleton');
    expect(otherInstance.getSyllabus()).toEqual(['Math', 'Physics']);
  });
});
