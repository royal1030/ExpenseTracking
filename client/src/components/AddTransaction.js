import React, { useContext } from 'react'
import { useState } from 'react'
import { GlobalContext } from '../context/GlobalState';


export const AddTransaction = () => {
    const [text,setText]=useState('');
    const [Amount,setAmount]=useState(0);
    const email = JSON.parse(localStorage.getItem("email"));
    // console.log(email);

    const {addtransaction} =useContext(GlobalContext);

    const submit=(e)=>{
        e.preventDefault();

        const newTransaction={
            // id: Math.floor(Math.random() * 100000000),
            text:text,
            // IF WE USE amount:+Amount , then it will add as number otherwise this add as a string and hence reduce function doesn't work
            amount:+Amount,
            email :email
        }
        addtransaction(newTransaction);
        setText('');
        setAmount(0);
    }

  return (
    <>
    <h3>Add new transaction</h3>
    <form onSubmit={submit}>
    <div className="form-control">
        <label htmlFor="text">Text</label>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
    </div>
    <div className="form-control">
        <label htmlFor="amount"
        >Amount <br />
        (negative - expense, positive - income)</label>
        <input type="number" value={Amount} onChange={(e)=>setAmount(e.target.value)}  placeholder="Enter amount..." />
    </div>
    <button className="btn">Add transaction</button>
    </form>
    </>
  )
}
