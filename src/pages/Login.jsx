import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleConnexion, link }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3000/user/login",
        "https://site--vintedback--qjy84vpdjsjt.code.run/user/login",

        { email, password }
      );

      handleConnexion(response.data.token);
      navigate(`${link}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <section className="section-login flex">
      <form onSubmit={handleSubmit}>
        <div className="flex login">
          <p>Se connecter</p>
          <input
            type="text"
            placeholder="Adresse email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <button>Se connecter</button>
          <Link to={`${link}` + "/signup"}>
            <p>Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
