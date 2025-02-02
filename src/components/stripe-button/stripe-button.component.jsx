import React from "react";
import StripeCheckout from "react-stripe-checkout";

// test credit card info
// 4242 4242 4242 4242 Exp: any future date - CW: any three number
// https://stripe.com/docs/testing#international-cards
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_zMP2pMgK15TEKn8dOb94ED2O009WI2PSbe";

  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;