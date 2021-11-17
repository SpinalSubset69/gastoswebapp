import React, { useState } from "react";
import Spinner from "../spinner/Spinner";
import { hot } from 'react-hot-loader';
import "./amountcard.css";

const AmountCard = ({ fetchAddAmount }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [amount, setAmount] = useState("");

  const handleAddAmountSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    const data = { amount };
    await fetchAddAmount(data);
    setIsFetching(false);
  };
  return (
    <div className="cardWrapper">
      {isFetching ? (
        <Spinner message="Agregando monto" />
      ) : (
        <form onSubmit={handleAddAmountSubmit} className="amountForm" action="">
          <h2>Agregar un monto:</h2>
          <input
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="formInput"
            type="text"
            placeholder="Monto..."
          />
          <button type="submit" className="formButton">
            Agregar
          </button>
        </form>
      )}
    </div>
  );
}
export default hot(module)(AmountCard);