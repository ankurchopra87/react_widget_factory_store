import React, { Component } from "react";

import Address from "./Address"
import "./address.css"

import { connect } from "react-redux";
import { Redirect } from 'react-router'

import CartItem from "./CartItem"

/* Presents the Checkout page */
class Checkout extends Component {

    constructor(props){
        super(props)   

        // Init state
        this.state = {
            form_fields: {email: '',
                bill_to_fullname: '',
                bill_to_street: '',
                bill_to_city: '',
                bill_to_state: '',
                bill_to_zip: '',
                ship_to_fullname: '',
                ship_to_street: '',
                ship_to_city: '',
                ship_to_state: '',
                ship_to_zip: '',
            },
            order: null
        }

        this.submitOrder = this.submitOrder.bind(this); 
        this.onChange = this.onChange.bind(this);
        this.validateData = this.validateData.bind(this);
    }

    // Hook to keep track of data entered in input fields
    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state
        state.form_fields[e.target.name] = e.target.value;
        this.setState(state);
    }

    // Validate if the order can be submitted
    validateData(){

        if (this.props.cartItems.length === 0){
            alert("Cart is Empty!");
            return false;
        }

        const keys = Object.keys(this.state.form_fields);
        for(let i=0; i< keys.length; i++){
            if (this.state.form_fields[keys[i]].length === 0){
                alert("Missing Value: "+ keys[i]);
                return false;
            }
        }
        return true;
    }

    // Hook to submit order when the button is clicked
    submitOrder(e){
        if(this.validateData()){ // validate 

            // populate post data from state

            // populate form data
            let form_fields = this.state.form_fields;
            const data = {
                'bill_to': {
                    'country': 'USA',
                    'street':form_fields.bill_to_street,
                    'city': form_fields.bill_to_city,
                    'state': form_fields.bill_to_state,
                    'postal_code': form_fields.bill_to_zip
                },
                'ship_to': {
                    'country': 'USA',
                    'street': form_fields.ship_to_street,
                    'city': form_fields.ship_to_city,
                    'state': form_fields.ship_to_state,
                    'postal_code': form_fields.ship_to_zip
                },
                'contact': {
                    'full_name': form_fields.bill_to_fullname,
                    'email': form_fields.email
                },
                'order_line_set': []
            }

            // Populate cart data
            let cartItems = this.props.cartItems;

            for(let i=0; i < cartItems.length; i++){
                let element = cartItems[i];
                data.order_line_set.push({
                    'sku': element.id,
                    'price': element.price,
                    'currency': element.currency,
                    'quantity': 1,
                    'ordering' : i + 1
                });
            }

            // POST order to REST backend.
            fetch("/api/orders/", {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                // 'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            })
            .then(response => {
                if(response.status === 201){ // Created
                    this.props.removeFromCart(); // Clear Cart
                    return response.json()
                }

                alert("Order creation Failed!"); // alert that creation failed
                return null;
            })
            .then(item => {
                // Set Order on completion. 
                this.setState({
                    order: item
                });
            });    
        }
        e.preventDefault();
    }

    render(){

        // Redirect if order exists/completed
        if (this.state.order !== null) {
            return <Redirect to={'/confirmation/' + this.state.order.id} />
        }

        var self = this;
        let cartItemsJsx = [];
        var total = 0.0;

        for(let i=0; i < this.props.cartItems.length; i++){
            let cartItem = this.props.cartItems[i];
            cartItemsJsx.push(<CartItem key={cartItem.id + '_' + i} cartItem={cartItem} index={i} removeFromCart={self.props.removeFromCart} />);
            total += parseFloat(cartItem.price); // calculate total
        }

        total = total.toFixed(8); // total to 8 decimal spaces

        return (
            <div className="row">
                <div className="col-75">
                    <div className="checkout">
                        <form onSubmit={this.submitOrder}>
                            <div className="row">   
                                <div className="col">
                                    <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                                    <input type="text" id="email" name="email" placeholder="john@example.com" onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="row">   
                                <Address title="Bill To" identifier="bill_to" onChange={this.onChange} />
                                <Address title="Ship To" identifier="ship_to" onChange={this.onChange} />
                            </div>
                            <input type="submit" value="Place Order" className="btn"
                                ref={(el) => this.submitInput = el} />
                        </form>
                    </div>
                </div>
                
                <div className="col-25">
                    <div className="checkout">
                    <p><b>Cart </b> <span className="price"> <i className="fa fa-shopping-cart"></i> <b>{this.props.cartItems.length}</b></span></p>
                    {cartItemsJsx}
                    <hr />
                    <p>Total <span className="price"><b>BTC {total}</b></span></p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
      cartItems: state.cartItems
    }
  }
  
  // Map Redux actions to component props
  function mapDispatchToProps(dispatch) {
    return {  
      removeFromCart: function(itemIndex) {
        return dispatch({
          type: "removeFromCart",
          cartItemIndex: itemIndex
        })  
      }
    }
  }
  
  // The HOC
  var connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Checkout);
  
export default connectedComponent;