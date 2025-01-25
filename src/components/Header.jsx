import { Link, useNavigate } from "react-router-dom";
// import { Range } from "react-range";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo.png";

// import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Header = ({
  token,
  handleConnexion,
  sort,
  handleSortChange,
  price,
  setPrice,
  search,
  setSearch,
}) => {
  const navigate = useNavigate();

  const showPrice = [...price];
  if (showPrice[0] === null) {
    showPrice[0] = 250;
  }
  if (showPrice[1] === null) {
    showPrice[1] = 750;
  }

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleChange = (event, newValue) => setPrice(newValue);
  return (
    <header className="flex container">
      <div className=" flex">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>

        <div className="flex search-content">
          <div className="flex search">
            <div className="flex">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Recherches des articles"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex filter-btn">
            <span>Trier par ordre :</span>
            <input
              type="checkbox"
              onClick={() => {
                handleSortChange(!sort);
              }}
            />
            <span>Trier par prix : </span>
            <Box sx={{ width: 200 }}>
              <Slider
                value={showPrice}
                max={1000}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </Box>
          </div>
        </div>

        <div className="navBtn flex">
          <div className="flex">
            {token ? (
              <button
                className="deconnexion"
                onClick={() => {
                  handleConnexion(null);
                  navigate("/");
                }}
              >
                Déconnexion
              </button>
            ) : (
              <>
                <Link to="/signup">
                  <button>S'incrire</button>
                </Link>
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
              </>
            )}
          </div>
          {token ? (
            <Link to="/publish">
              <button className="btn">Vends tes articles</button>
            </Link>
          ) : (
            <Link to="/publish/login">
              <button className="btn">Vends tes articles</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
