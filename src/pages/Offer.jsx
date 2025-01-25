import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3000/offer/${id}`
          `https://site--vintedback--qjy84vpdjsjt.code.run/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>En chargement ...</p>
  ) : (
    <main>
      <section className="offers flex">
        <div>
          <img
            src={data.product_image.secure_url}
            alt={data.product_description}
          />
        </div>
        <div className="flex">
          <div className="details flex">
            <p>{data.product_price} €</p>
            <div>
              {data.product_details.map((detail, index) => {
                // console.log("Details Object in array   ", detail);
                const keys = Object.keys(detail);
                // console.log("Liste des clefs   ", keys);
                const keyName = keys[0];
                // console.log("Nom de la clefs   ", keyName);
                return (
                  <p key={index}>
                    {keyName} : {detail[keyName]}
                  </p>
                );
              })}
            </div>
          </div>
          <Link
            to="/payment"
            state={{ title: data.product_name, price: data.product_price }}
          >
            <button className="btn">Acheter cette article</button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Offer;
