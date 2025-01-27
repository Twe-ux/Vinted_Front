import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Ql9gaR2Woca2C2AxYmZz0CwL7f0lPazGJUjjhvXpw9YNR2hE9KCv6kMRCQQtsgWRj6lsunAQyxA6oTLOs5psT0C0015km9is5"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  //   console.log(title);
  //   console.log(price);
  const feesProtect = 0.4;
  const feesDelivery = 0.8;
  const valueTotal = feesDelivery + feesProtect + Number(price);

  const options = { currency: "eur" };

  return token ? (
    <main className="payment-container">
      <div className="payment-container">
        <p>Résumé de la commande</p>

        <div className="payment-display">
          <p>Commande</p>
          <p>{Number(price).toFixed(2)} €</p>
        </div>
        <div className="payment-display">
          <p>Frais protection acheteurs</p>
          <p>{Number(feesProtect).toFixed(2)} €</p>
        </div>
        <div className="payment-display">
          <p>Frais de port</p>
          <p>{Number(feesDelivery).toFixed(2)} €</p>
        </div>
        <div className="payment-display">
          <p>Total</p>
          <p>{valueTotal} €</p>
        </div>

        <p>Il ne vous reste plus qu'une étape pour vous offrir {title}. </p>
        <p>
          Vous allez payez {valueTotal} € (frais de protection et frais de port
          inclus).
        </p>
      </div>
      <div className="stripe">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  ) : (
    <Navigate to="login" />
  );
};

export default Payment;
