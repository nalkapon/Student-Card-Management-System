const PaymentAdapter = require('../paymentAdapter.js');

describe('Adapter Pattern - Payment Adapter', () => {
  test('should convert mock API response to system format', () => {
    const mockAPIResponse = {
      uid: 'user456',
      paymentAmount: 200,
      status: 'SUCCESS',
    };

    const adapter = new PaymentAdapter();
    const result = adapter.adapt(mockAPIResponse);

    expect(result).toEqual({
      userId: 'user456',
      amount: 200,
      status: 'success',
    });
  });
});
