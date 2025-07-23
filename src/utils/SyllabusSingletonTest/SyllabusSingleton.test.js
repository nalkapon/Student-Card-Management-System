const SyllabusSingleton = require('../src/SyllabusSingleton');

describe('Singleton Pattern - SyllabusSingleton', () => {
  test('Should return the same instance every time', () => {
    const instance1 = require('../src/SyllabusSingleton');
    const instance2 = require('../src/SyllabusSingleton');
    expect(instance1).toBe(instance2); // aynı referans mı
  });

  test('Should store and retrieve syllabus data', () => {
    const syllabus = ['Math', 'Physics'];
    SyllabusSingleton.setSyllabus(syllabus);
    expect(SyllabusSingleton.getSyllabus()).toEqual(syllabus);
  });

  test('Should maintain shared state across imports', () => {
    const otherInstance = require('../src/SyllabusSingleton');
    expect(otherInstance.getSyllabus()).toEqual(['Math', 'Physics']);
  });
});
