const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Strap expects cents
            currency,
        });
        return paymentIntent;
    } catch (error) {
        console.error('Stripe Error:', error);
        throw error;
    }
};
