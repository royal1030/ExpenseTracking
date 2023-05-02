import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";
export const TransactionList = () => {
  const { transactions, gettransactions } = useContext(GlobalContext);
  const email = JSON.parse(localStorage.getItem("email"));
  console.log(email);

  useEffect(() => {
    gettransactions(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(transactions);

  return (
    <>
      <h3>History</h3>
      <ul
        className="list"
        style={{
          overflowY: "scroll",
          maxHeight: "200px",
          padding: "0 20px",
          margin: "10px 0",
        }}
      >
        {/* IN THIS PLACE WE ADD THE TRANSACTION INSIDE THIS TRANSCATION LIST  */}

        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
        {/* {transactions.map((transaction)=>
      
      {return(
        <li class="minus">
        Cash <span>-$400</span><button class="delete-btn">x</button>
        </li>
      )
      }
      )} */}
      </ul>
    </>
  );
};
