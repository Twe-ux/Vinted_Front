import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleConnexion, link }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNewsletterChange = () => setNewsletter(!newsletter);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      // const formData = new FormData();
      // formData.append("email", email);
      // formData.append("username", username);
      // formData.append("password", password);
      // formData.append("newsletter", newsletter);
      // formData.append("avatar", avatar);

      const response = await axios.post(
        // "http://localhost:3000/user/signup",
        "https://site--vintedback--qjy84vpdjsjt.code.run/user/signup",

        // formData
        {
          email,
          username,
          password,
          newsletter,
        }
      );
      // console.log(response.data);
      handleConnexion(response.data.token);
      navigate(`${link}`);
    } catch (error) {
      // Si je reçois le status 409
      if (error.response?.status === 409) {
        // je fais appraître un message d'erreur
        setError("Cet email est déjà utilisé");
      } else if (error.response?.data.message === "Missing parameters") {
        // Si je reçois le message Missing parameters idem
        setError("Veuillez remplir tous les champs :)");
      } else {
        // Si je tombe dans le catch pour une raison inconnue
        setError(
          "Une erreur est survenue, veuillez réessayer dans quelques minutes"
        );
      }
    }
  };

  return (
    <section className="section-signup flex">
      <div className="flex signup ">
        <form className="flex" onSubmit={handleSubmit}>
          <p>S'inscrire</p>
          <input
            type="text"
            name="name"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Mot de passe"
          />
          {/* <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          /> */}

          <div className="flex">
            <input
              type="checkbox"
              value={newsletter}
              onChange={handleNewsletterChange}
            />
            <p>S'incrire à la newsletter</p>
          </div>
          <span>
            En m'inscrivant je confirme avoir lu et accepte les Termes
          </span>
          <span>& Conditions et Politique de Confidentialité de Vinted.</span>
          <span>Je confirme avoir au moins 18 ans.</span>
          <button>S'inscrire</button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Link to={`${link}` + "/login"}>
            <p>Tu as déjà un compte ? Connect-toi !</p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
