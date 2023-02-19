import React, { createContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';
// import uuid from 'react-uuid';
import axios from 'axios';
// Initial state
const initialState = {
  transactions: [
    //   { id: uuid(), text: 'Flower', amount: -20 },
    //   { id: uuid(), text: 'Salary', amount: 300 },
    //   { id: uuid(), text: 'Book', amount: -10 },
    //   { id: uuid(), text: 'Passive Income', amount: 150 }
    ],
    error:null,
    loading :true,
}
// var Email = "";

// Create context
export const GlobalContext = createContext(initialState);
// console.log(initialState);

//create provider (USE FOR WRAP ALL THE COMPONENTS IN THE PROVIDER )
export const GlobalProvider=({children})=>{
    const [state, dispatch] = useReducer(AppReducer,initialState);

// ACTIONS

const gettransactions=async(email)=>{
    try{
        // console.log(`email in globalState : ${email}`);
        // WE DON'T NEED 'http://localhost:8000/api/v1/transaction'
        const res=await axios.get(`/api/transaction/${email}`);

        // console.log(`res.data.data.transactions in gettransaction : ${res.data.data.transactions[0]}`);
        

        // res.data gives the object
    // Eg:"success": true,
    //     "count": 1,
    //     "data": [
    //         {
    //             "_id": "63df3f35f210d90f30a99efe",
    //             "text": "Credit Card",
    //             "amount": 1200,
    //             "createdAt": "2023-02-05T05:31:33.775Z",
    //             "__v": 0
    //         }
    //     ]
    // }
    // IN THIS res.data.data will get the transactions, so, we use transaction.data.data as a  payload

        dispatch({
            type:'GET_TRANSACTION',
            payload:res.data.data[0].transactions,
        })
        // console.log(`get transaction ${state}`)
    }catch(e){
        dispatch({
            type:"TRANSACTION_ERROR",
            payload:e.response.data.error
        })
    }
}

// const deletetransaction=(id)=>{
//     dispatch({
//         type :'DELETE_TRANSACTION',
//         payload :id
//     })
// }

// const addtransaction=(transaction)=>{
//     dispatch({
//         type:'ADD_TRANSACTION',
//         payload:transaction
//     })
// }

const deletetransaction=async(id,email)=>{
    try {
        await axios.delete(`/api/transaction/${email}/${id}`);
  
        dispatch({
          type: 'DELETE_TRANSACTION',
          payload: id
        });
      } catch (err) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.response.data.error
        });
      }
    
}

const addtransaction=async(transaction)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        const res=await axios.post('/api/transaction',transaction,config);
        const sze=res.data.data.transactions.length;
        // console.log(`size of transactions : ${sze}`);
        // console.log(`res .data.transactions (FRONTEND) -> ${res.data.data.transactions[5].amount}`);
        dispatch({
            type:'ADD_TRANSACTION',
            payload:res.data.data.transactions[sze-1],
        })
        

    }catch(err){
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
    }
   
}

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deletetransaction,
        addtransaction,
        gettransactions,
        error:state.error,
        loading:state.loading,
        // Email,
      }}>
      {/* REMEMBER THIS THAT WE CAN'T CHANGE CHILDREN TO ANY OTHER PARAMETER AND ARGUMENT , IF WE DO THAT THEN IT DOESN'T GIVE ANYTHING.. */}
        {children}
      </GlobalContext.Provider>);
}