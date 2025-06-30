// Proxy Pattern: Yükleme öncesi kontrol
const proxyCheck = (req, res, next) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Geçersiz yükleme tutarı!' });
  }

  if (amount > 1000) {
    return res.status(403).json({ message: 'Yükleme limiti aşıldı! (Max 1000₺)' });
  }

  next();
};

module.exports = proxyCheck;
