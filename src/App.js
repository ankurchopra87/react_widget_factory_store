import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Route, 
  NavLink, 
  HashRouter
} from "react-router-dom";

import Home from "./Home";
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";
import OrderConfirmation from "./OrderConfirmation"

import './App.css';

/* The body of the Single Page Application  */
class Main extends Component {
  render() {
      return (
          <HashRouter>
          <div> 
              {/* Header */}  
              <div className="header">
                  <NavLink to="/" className="logo">Widget Factory</NavLink>
                  <a href="/admin/store/order/" target="_blank">Orders</a> {/* Link to Django Admin Orders Interface */}
                  <a href="/admin/" target="_blank">Admin</a> {/* Link to Django Admin Interface */}
                  <div className="header-right">
                      <NavLink to="/checkout">Checkout ({this.props.cartItems.length})</NavLink>   
                  </div>
              </div>

              {/* Content */}  
              <div className="content">
                  <Route exact path="/" component={Home} /> 
                  <Route path='/product/:number' component={ProductDetail}/> 
                  <Route path='/checkout' component={Checkout}/> 
                  <Route path='/confirmation/:number' component={OrderConfirmation}/> 
              </div>
              
          </div>
          </HashRouter>
      )
  }
}

function mapStateToProps(state){
  return {
    cartItems: state.cartItems
  }
}

// The HOC
var connectedComponent = connect(
  mapStateToProps,{}
)(Main);

export default connectedComponent;
