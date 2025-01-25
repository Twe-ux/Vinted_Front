import axios from "axios";

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

//Components
import BoxDetails from "../components/BoxDetails";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", detail);
      formData.append("price", price);
      formData.append("condition", state);
      formData.append("city", town);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        // "http://localhost:3000/publish",
        "https://site--vintedback--qjy84vpdjsjt.code.run/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);

      const id = response.data._id;
      navigate(`/offer/${id}`);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return token ? (
    <form onSubmit={handleSubmit}>
      <main className="flex publish ">
        <div className="">
          <h1>Vends ton article</h1>
          <div className="flex upload-file">
            <input
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
            {picture && <img src={URL.createObjectURL(picture)} alt="" />}
          </div>
        </div>
        <div className="flex item-publish">
          <BoxDetails
            title={"titre"}
            description={"Ex: Chemise Zara"}
            state={title}
            setState={setTitle}
          />
          <BoxDetails
            title={"Décris article"}
            description={"Ex: Porté fois.."}
            state={detail}
            setState={setDetail}
          />
        </div>
        <div className="flex item-publish">
          <BoxDetails
            title={"Marque"}
            description={"Ex: Zara"}
            state={brand}
            setState={setBrand}
          />
          <BoxDetails
            title={"Taille"}
            description={"Ex: M / 40 / 12ans"}
            state={size}
            setState={setSize}
          />
          <BoxDetails
            title={"Couleur"}
            description={"Ex: Fushia"}
            state={color}
            setState={setColor}
          />
          <BoxDetails
            title={"Etat"}
            description={"Ex: Neuf"}
            state={state}
            setState={setState}
          />
          <BoxDetails
            title={"Lieu"}
            description={"Ex: Paris"}
            state={town}
            setState={setTown}
          />
        </div>
        <div className="flex item-publish">
          <BoxDetails
            title={"Prix"}
            description={"0,00 €"}
            state={price}
            setState={setPrice}
          />
          <div className="flex check">
            <input type="checkbox" name="" id="" />
            <span>Je suis intéréssé(e) par les échanges</span>
          </div>
        </div>
        <button className="btn">Ajouter</button>
      </main>
    </form>
  ) : (
    <Navigate to="/login/publish" />
  );
};
export default Publish;
