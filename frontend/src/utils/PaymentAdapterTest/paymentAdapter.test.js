import { adaptPaymentData } from '../paymentAdapter';

describe('Adapter Pattern - Payment Adapter', () => {
  test('should convert mock API response to system format', () => {
    const mockFormData = {
      amount: "200.00",
      cardNumber: "4111111111111111",
      expiry: "12/25",
      cvc: "123",
      country: "TR",
      postalCode: "34000"
    };

    const userId = "user456";

    const result = adaptPaymentData(mockFormData, userId);

    expect(result).toEqual({
      user_id: "user456",
      amount: 200,
      payment_info: {
        card_number: "4111111111111111",
        expiry: "12/25",
        cvc: "123",
        country: "TR",
        postal_code: "34000"
      }
    });
  });
});
