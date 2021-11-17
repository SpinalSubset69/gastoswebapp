import React, { useEffect, useState } from "react";
import AmountCard from "../../components/amountCard/AmountCard";
import ExpensesCard from "../../components/expensesCard/ExpensesCard";
import Formcard from "../../components/formcard/Formcard";
import ToastMessage from "../../components/toastmessage/ToastMessage";
import {
  IsValidToken,
  FetchUser,
  FetchPutExpense,
  FetchPutAmount,
  FetchRemoveExponse,
} from "../../api/FetchPlan";
import { hot } from "react-hot-loader";
import "./home.css";
import Spinner from "../../components/spinner/Spinner";

const Home = () => {
  const [user, setUser] = useState({});
  const [toastResponse, setToastResponse] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      const validatedToken = await IsValidToken();
      if (!validatedToken) {
        window.location = "/";
      }
    }

    async function fetchUser() {
      const response = await FetchUser();
      if (response !== null) {
        setUser(response);
      }      
    }
    verifyToken();
    fetchUser();
  }, []);

  const fetchPutExpense = async (data) => {
    if (isNaN(data.amount)) {
      const response = {
        statusCode: 400,
        errorMessage: "Ingrese una cantidad numerica",
      };
      setToastResponse(response);
      return;
    }

    const validatedToken = await IsValidToken();
    if (!validatedToken) {
      window.location = "/";
    }

    const response = await FetchPutExpense(data);

    if (response.data) {
      setUser(response.data);      
    }
    setToastResponse(response);
  };

  const fetchAddAmount = async (data) => {
    if (isNaN(data.amount)) {
      const response = {
        statusCode: 400,
        errorMessage: "Ingrese una cantidad numerica",
      };
      setToastResponse(response);
      return;
    }

    const validatedToken = await IsValidToken();
    if (!validatedToken) {
      window.location = "/";
    }

    const response = await FetchPutAmount(data);
    if (response.data) {
      setUser(response.data);
    }
    setToastResponse(response);
  };

  const fetchRemoveExpense = async (data) => {
    const validatedToken = await IsValidToken();
    if (!validatedToken) {
      window.location = "/";
    }

    const response = await FetchRemoveExponse(data);
    console.log(response);
    if (response.data) {
      setUser(response.data);
    }
    const toastMessage = { statusCode: 200, message: "Gasto Eliminado" };
    setToastResponse(toastMessage);
  };

  const sortElmentsByAmount = (expenses) => {
    const sortedExpenses = [];

    //BurbleSort
    for (let i = 0; i < expenses.length; i++) {
      for (let j = 0; j < expenses.length - 1; j++) {
        if (expenses[i].amount > expenses[j].amount) {
          let aux = expenses[i];
          expenses[i] = expenses[j];
          expenses[j] = aux;
        }
      }
    }
    expenses.forEach((expense) => sortedExpenses.push(expense));
    return sortedExpenses;
  };

  const sortElementsbyDate = (expenses) => {
    let sortedExpenses = [];    
    console.log(expenses);

    //SelectionSort
    for (let i = 0; i < expenses.length; i++) {
      let min = i;            
      for (let j = 1 + 1; j < expenses.length ; j++) {
        if (expenses[j].createdAt > expenses[min].createdAt) {
          min = j;
        }
      }

      let auxExpense = expenses[i];
      expenses[i] = expenses[min];
      expenses[min] = auxExpense;
    }

    expenses.forEach((expense) => sortedExpenses.push(expense));

    return sortedExpenses;
  };

  return (
    <>
   {
     user ? 
     <div className="homeWrapper">
     {user ? (
       <ExpensesCard
         sortElmentsByAmount={sortElmentsByAmount}
         sortElementsbyDate={sortElementsbyDate}
         removeExpense={fetchRemoveExpense}
         user={user}
       />
     ) : null}
     <div className="formsContainer">
       <h1>Aplicacion de Gastos</h1>
       <Formcard fetchPutExpense={fetchPutExpense} />
       <div className="toastContainer">
       {toastResponse ? <ToastMessage response={toastResponse}/> : null}
       </div>
       <AmountCard fetchAddAmount={fetchAddAmount} />
     </div>
   </div> 
   : <Spinner message= 'Cargando Usuario...' />
    }
    </>
  );  
};

export default hot(module)(Home);
