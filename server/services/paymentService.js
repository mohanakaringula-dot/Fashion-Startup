const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy',
});

const createPaymentOrder = async ({ amount, currency = 'INR', receipt }) => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return {
      id: `offline_${Date.now()}`,
      amount,
      currency,
      receipt,
      mode: 'mock',
    };
  }

  return razorpay.orders.create({ amount, currency, receipt });
};

module.exports = { createPaymentOrder };
