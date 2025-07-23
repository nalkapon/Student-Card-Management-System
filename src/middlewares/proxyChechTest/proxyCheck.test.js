const express = require('express');
const request = require('supertest');
const proxyCheck = require('../proxyCheck.js');

const app = express();
app.use(express.json());

app.post('/balance/load', proxyCheck, (req, res) => {
  res.status(200).json({ message: 'Yükleme başarılı' });
});

describe('Proxy Pattern – proxyCheck middleware', () => {
  test('Geçersiz yükleme tutarı (0)', async () => {
    const res = await request(app).post('/balance/load').send({ amount: 0 });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Geçersiz yükleme tutarı!');
  });

  test('Yükleme limiti aşıldı (1100)', async () => {
    const res = await request(app).post('/balance/load').send({ amount: 1100 });
    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Yükleme limiti aşıldı! (Max 1000₺)');
  });

  test('Geçerli yükleme tutarı (500)', async () => {
    const res = await request(app).post('/balance/load').send({ amount: 500 });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Yükleme başarılı');
  });
});
