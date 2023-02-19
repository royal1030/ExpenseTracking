import React from 'react';
import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import  Header  from './components/Header';
import {Balance} from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import Registration from './components/Registration';
import Login from './components/Login';


function App() {
  return (
   <>
    <BrowserRouter>

    <Routes>
    <Route path="/" exact element={<>
    <Header/>
    <Registration/>
    </>
    } />
    </Routes>

    <Routes>
    <Route path="/registration" exact element={<>
    <Header/>
    <Registration/>
    </>
    } />
    </Routes>

    {/* <Routes>
    <Route path="/logout" exact element={<>
    <Header/>
    <Registration/>
    </>
    } />
    </Routes> */}

    <Routes>
      <Route path='/home' exact element={<>
    <GlobalProvider>
      <Header/>
      <div className="container">
      <Balance/>
      <IncomeExpenses/>
      <TransactionList/>
      <AddTransaction/>
      </div>
    </GlobalProvider>
      </>} />
    </Routes>

    <Routes>
      <Route path="/login" exact element={<>
        <Header/>
        <Login/>
      </>
      } />
      </Routes>

    </BrowserRouter>


      {/* <GlobalProvider>
      <Header/>
      <div className="container">
        <Balance/>
        <IncomeExpenses/>
        <TransactionList/>
        <AddTransaction/>
      </div>
      </GlobalProvider> */}
      </>
  );
}

export default App;
