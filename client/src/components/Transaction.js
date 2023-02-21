import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import {numberWithCommas} from '../utils/format';


export const Transaction = ({transaction}) => {
  const email = JSON.parse(localStorage.getItem("email"));
    const {deletetransaction}=useContext(GlobalContext);
    const sign=transaction.amount<0?'-':'+';
  return (
    <div>
        <li className={transaction.amount<0 ? "minus":"plus"}>
          {transaction.text} <span>Rs.{sign}{numberWithCommas(Math.abs(transaction.amount))}</span><button className="delete-btn" onClick={()=>deletetransaction(transaction._id,email)}>x</button>
      </li>
    </div>
  )
}
