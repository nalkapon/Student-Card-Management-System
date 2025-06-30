module.exports = (app) => {
  const studentCards = require('../controllers/Student_Cards.controller');
  const proxyCheck = require('../middlewares/proxyCheck'); // Proxy middleware'ini ekliyoruz

  if (!studentCards) {
    console.error('Student_Cards.controller.js could not be found or is undefined.');
    return;
  }

  // Kart oluşturma
  app.post('/student_cards', studentCards.create);

  // Tüm kartları getir
  app.get('/student_cards', studentCards.findAll);

  // Belirli kartı getir
  app.get('/student_cards/:cardId', studentCards.findOne);

  // Kart güncelle
  app.put('/student_cards/:cardId', studentCards.update);

  // Kart sil
  app.delete('/student_cards/:cardId', studentCards.delete);

  // Bakiye güncelleme - Proxy pattern ile korumalı
  app.post('/student_cards/update_balance', proxyCheck, studentCards.updateBalance);
};
