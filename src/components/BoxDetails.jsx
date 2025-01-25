const BoxDetails = ({ title, description, state, setState }) => {
  return (
    <div className="flex title">
      <span>{title}</span>
      <input
        type="text"
        name=""
        id=""
        placeholder={description}
        value={state}
        onChange={(event) => {
          setState(event.target.value);
        }}
      />
    </div>
  );
};

export default BoxDetails;
