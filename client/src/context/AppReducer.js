export default (state, action) => {
    switch(action.type) {

      case 'GET_TRANSACTION':
        
        return{

          ...state,
          loading:false,
          transactions:action.payload,
        }
        
        

      case 'DELETE_TRANSACTION':

        // console.log(`this is inside the delete `);
        // console.log(state);
        // const obj=state.transactions.filter(transaction => transaction.id !== action.payload);
        return {

          //return only obj??
          ...state,
          transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
        }
        
      case 'ADD_TRANSACTION':
        
        return {
          ...state,
          transactions: [ ...state.transactions,action.payload]
        }
      
      // case 'TRANSACTION_ERROR':
      //   return{
      //     ...state,
      //     error:action.payload
      //   }
        
      default:
        return state;
    }
  }

//   export default AppReducer;