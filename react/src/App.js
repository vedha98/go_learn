import React from 'react';
import './App.css';
import {toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/login';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Dash from './components/dashboard/dashboard';
import SignUp from './components/signup/signup';
import {Provider} from 'react-redux';
import Store from './store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,

} from "react-router-dom";
const testAuth=()=>{
  const token = localStorage.getItem("token")
  if(token){
    return true}else{return false}
}
const PrivateRoute =({ component: Component, ...rest }) =>{
  let val =testAuth() 
  return(<Route {...rest} render={(props) => (
    val=== true
     ? <Component {...props} />
     : <Redirect to='login' />
 )} />)
  
 
} 
function App() {
  return (
    <Provider store={Store}>
    <div className="app">
    
          <Router>
        

        
        <Switch>
          
          
          <Route exact path="/login" component={Login}/>
          <Route exact path="/home" component={Home}/>     
          <Route exact path="/signup" component={SignUp}/>  zz
          <PrivateRoute path="*" component={Dash}/>
          
        </Switch>
     
    </Router>
    <ToastContainer autoClose={2000} />
    </div>
    
    </Provider>
        
 
  );
}

export default App;
