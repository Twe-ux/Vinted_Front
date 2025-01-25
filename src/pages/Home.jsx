import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Item from "../components/Item";

const Home = ({ price, sort, search, token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = new URL(
        // "http://localhost:3000/offer"
        "https://site--vintedback--qjy84vpdjsjt.code.run/offer"
      );

      if (search !== null) {
        url.searchParams.set("title", `${search}`);
      }
      if (price[0] !== null) {
        url.searchParams.set("priceMin", `${price[0]}`);
      }
      if (price[1] !== null) {
        url.searchParams.set("priceMax", `${price[1]}`);
      }
      if (sort === true) {
        url.searchParams.set("sort", "price-asc");
      }
      if (sort === false) {
        url.searchParams.set("sort", "price-desc");
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [price, sort, search]);

  return isLoading ? (
    <p>En chargement ...</p>
  ) : (
    <>
      <div className="hero">
        <div className="container">
          <div className="card flex">
            <p>Prêts à faire du tri dans vos placards ?</p>
            {token ? (
              <Link to="/publish">
                <button className="btn">Commencer à vendre</button>
              </Link>
            ) : (
              <Link to="/login/publish">
                <button className="btn">Commencer à vendre</button>
              </Link>
            )}
          </div>
        </div>
        <div className="hero_overlay"></div>
      </div>

      <section className="container flex items-content">
        {data.offers.map((offer) => {
          return (
            <Link key={offer._id} to={`/offer/${offer._id}`}>
              <Item offer={offer} />
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Home;
