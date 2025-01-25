const Item = ({ offer }) => {
  return (
    <article className="item">
      <div className="user flex">
        {offer.owner.account.avatar ? (
          <img
            src={offer.owner.account.avatar.secure_url}
            alt={offer.owner.account.username}
          />
        ) : (
          <img
            src="src/assets/img/Favicon.png"
            alt={offer.owner.account.username}
          />
        )}
        <p className="flex">{offer.owner.account.username}</p>
      </div>
      <img
        src={offer.product_image.secure_url}
        alt={offer.owner.account.username}
      />
      <div className="description flex">
        <p>{offer.product_price} €</p>
        <p>{offer.product_details[1].TAILLE}</p>
        <p>{offer.product_details[0].MARQUE}</p>
      </div>
    </article>
  );
};

export default Item;
