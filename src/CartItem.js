import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CartItem extends Component {
    constructor(props){
        super(props)

        this.onClickToRemove = this.onClickToRemove.bind(this); 
    }

    onClickToRemove(e){
        this.props.removeFromCart(this.props.index);
    }
    
    render(){
        var cartItem = this.props.cartItem;
        return (
            <p>
                <NavLink to={"/product/" + cartItem.product.id + "/"}>{cartItem.number}</NavLink>
                <span className="remove" onClick={this.onClickToRemove}>x</span>
                <span className="price">{cartItem.currency} {cartItem.price}</span>
            </p>
        )    
    }
}

export default CartItem;