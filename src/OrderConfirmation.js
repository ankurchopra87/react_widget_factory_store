import React, { Component } from "react";

/* A simple order confirmation page */
class OrderConfirmation extends Component {
    constructor(props) {
        super(props); 

        // Get order number from url.
        this.orderNumber = parseInt(this.props.match.params.number, 10)
    }

    render() {
        return (
            <div className='order-confirmation'>
                <p>
                   Created Order #  <a href={"/admin/store/order/" + this.orderNumber + "/change/"} target="_blank">{this.orderNumber}</a></p>    
            </div>
        );
    }
}

export default OrderConfirmation; 