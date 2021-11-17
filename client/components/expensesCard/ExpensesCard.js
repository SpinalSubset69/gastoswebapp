import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import { hot } from "react-hot-loader";
import "./expensescard.css";
import potionIcon from "./../../assets/icons/potion.png";
import removeIcon from "./../../assets/icons/remove.png";

const ExpensesCard = ({ user, removeExpense, sortElmentsByAmount, sortElementsbyDate }) => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {    
    setExpenses(user.expenses);    
  }, [user]);

  const removeElement = (e) => {
    return new Promise((resolve) => {
      const items =
        document.getElementsByClassName("expensesList")[0].childNodes;

      items.forEach((item) => {
        if (item.id === e) {
          item.classList.toggle("disappear");
          return;
        }
      });
      resolve();
    });
  }; 

  const handleRemoveExpense = async function (e) {
    const data = { expenseId: e };
    await removeElement(e);
    setTimeout(async () => {
      await removeExpense(data);
    }, 500);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    setExpenses(
      user.expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSort =  (e) => {    
    const sortBy = e.target.innerText;    
    
    switch(sortBy){
      case 'Monto':               
      setExpenses(null); 
        const sortedElementsByAmount = sortElmentsByAmount(user.expenses);        
        setExpenses(sortedElementsByAmount);
        break;  
      case 'Fecha':        
        setExpenses(null); 
        const sortedElementsByDate = sortElementsbyDate(user.expenses);                
        setExpenses(sortedElementsByDate);
        break;
    }
  }

  return (
    <div className="cardExpensesWrapper">
      {user ? (
        <>
          <div className="cardHeader">
            <img
              className="cardHeaderImg"
              src={`http://localhost:4000/api/user/getimg/${user.img}`}
              alt=""
            />
            <div className="cardHeaderInfo">
              <h1>Bienvenido(a) {user.username}</h1>
              <div className="cardHeaderInfoStatus">
                <h3>Dinero actual: {user.currentTotalAmount}</h3>
                <h3>Gasto Actual: {user.currentSpentAmount}</h3>
              </div>
              <div className="filterContainer">
                <p className="filterTitle">Buscar:</p>
                <input
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar Por Titulo..."
                  className="filterInput"
                  type="text"
                />
              </div>
              <div className="sortByContainer">
                <p>Ordenar por: </p>
                <div className="dropDown">
                  <span>Opciones</span>
                  <div className="dropdown-content">
                    <p onClick= {(e) => { handleSort(e) }} className="dropdown-element">Monto</p>
                    <p onClick= {(e) => { handleSort(e) }} className="dropdown-element">Fecha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {expenses ? (
            <div className="listContainer">
              <ul className="expensesList">
                {expenses.map((e) => {
                  return (
                    <li id={e._id} className="expensesListItem" key={e._id}>
                      <img className="itemIcon" src={potionIcon} alt="" />
                      <h1>{e.title}</h1>
                      <p>{e.description}</p>
                      <p>Gasto: {e.amount}</p>
                      <img
                        onClick={() => handleRemoveExpense(e._id)}
                        className="removeIcon"
                        src={removeIcon}
                        alt=""
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : <div className="noDataContainer">
            <h1>No Data Found!!</h1></div>}
        </>
      ) : (
        <Spinner message="Cargando Gastos.." />
      )}
    </div>
  );
};
export default hot(module)(ExpensesCard);
