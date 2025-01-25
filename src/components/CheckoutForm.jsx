import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      if (elements === null) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/payment"
        // "https://site--vintedback--qjy84vpdjsjt.code.run/payment"
      );
      // console.log(response.data);

      const clientSecret = response.data;
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }
      if (paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disable={!stripe || !elements || isLoading}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
