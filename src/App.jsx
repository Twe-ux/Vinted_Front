import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Routes
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const [sort, setSort] = useState(true);
  const [price, setPrice] = useState([null, null]);
  const [search, setSearch] = useState("");

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleConnexion = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 14 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  const handleSortChange = (sort) => {
    if (sort) {
      setSort(true);
    } else {
      setSort(false);
    }
    // console.log(sort);
  };

  return (
    <Router>
      <Header
        token={token}
        handleConnexion={handleConnexion}
        sort={sort}
        handleSortChange={handleSortChange}
        price={price}
        setPrice={setPrice}
        search={search}
        setSearch={setSearch}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                token={token}
                sort={sort}
                price={price}
                setPrice={setPrice}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleConnexion={handleConnexion} publish={"/"} />}
          />
          <Route
            path="/login"
            element={<Login handleConnexion={handleConnexion} publish={"/"} />}
          />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route
            path="/publish/login"
            element={
              <Login handleConnexion={handleConnexion} link={"/publish"} />
            }
          />
          <Route
            path="/publish/signup"
            element={
              <Signup handleConnexion={handleConnexion} link={"/publish"} />
            }
          />
          <Route path="/payment" element={<Payment token={token} />} />
          <Route
            path="/payment/login"
            element={
              <Login handleConnexion={handleConnexion} link={"/payment"} />
            }
          />
          <Route
            path="/payment/signup"
            element={
              <Signup handleConnexion={handleConnexion} link={"/payment"} />
            }
          />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
