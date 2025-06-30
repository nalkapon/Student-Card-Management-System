import React, { useState } from 'react';
import './ValidatePaymentMethod.css';
import { FaCreditCard } from 'react-icons/fa';
import card from '../assets/card.png';
import axios from 'axios';
import { setCurrentUserId, getCurrentUserId } from '../utils/userUtils';
import { adaptPaymentData } from '../utils/paymentAdapter'; // Adapter fonksiyonu eklendi

const ValidatePaymentMethod = () => {
  const [activePayment, setActivePayment] = useState('Card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    country: '',
    postalCode: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/(2[4-9]|3[0-9])$/;
    const cvcRegex = /^\d{3}$/;
    const postalCodeRegex = /^\d{5}$/;

    if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }

    if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format (e.g., 05/24).';
    }

    if (!cvcRegex.test(formData.cvc)) {
      newErrors.cvc = 'CVC must be 3 digits.';
    }

    if (!postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be 5 digits.';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSelect = (paymentType) => {
    setActivePayment(paymentType);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userId = getCurrentUserId() || 1; // Oturumdan al ya da 1

    try {
      const adaptedData = adaptPaymentData(formData, userId); // Adapter pattern uygulandı
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/student_cards/update_balance`, adaptedData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error updating balance:', error);
      alert('Failed to update balance.');
    }
  };

  return (
    <div className="validate-payment-container">
      <h1>Validate Payment Method</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="payment-options">
          <button
            type="button"
            className={`payment-option ${activePayment === 'Card' ? 'active' : ''}`}
            onClick={() => handlePaymentSelect('Card')}
          >
            <FaCreditCard style={{ marginRight: '8px' }} /> Card
          </button>
        </div>

        {activePayment === 'Card' && (
          <>
            <div className="form-group card-input-wrapper">
              <label>Card Number</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  placeholder="1234 1234 1234 1234"
                />
                <img src={card} alt="Card Icon" className="card-icon" />
              </div>
              {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  placeholder="MM / YY"
                />
                {errors.expiry && <p className="error-message">{errors.expiry}</p>}
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="password"
                  name="cvc"
                  value={formData.cvc}
                  onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                  placeholder="CVC"
                />
                {errors.cvc && <p className="error-message">{errors.cvc}</p>}
              </div>
            </div>
          </>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="Turkey">Turkey</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              placeholder="90210"
            />
            {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
            min="0"
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}
        </div>

        <button type="submit" className="btn-submit">Continue</button>
      </form>
    </div>
  );
};

export default ValidatePaymentMethod;
