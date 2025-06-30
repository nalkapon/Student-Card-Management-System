// Adapter Pattern: Kullanıcıdan alınan form verisini backend'e uygun hale getirir

export const adaptPaymentData = (formData, userId) => {
  return {
    user_id: userId,
    amount: parseFloat(formData.amount),
    payment_info: {
      card_number: formData.cardNumber,
      expiry: formData.expiry,
      cvc: formData.cvc,
      country: formData.country,
      postal_code: formData.postalCode
    }
  };
};
