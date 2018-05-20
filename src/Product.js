import React, { Component } from "react";

/*
Presents Product Info in a Card
*/
class Product extends Component {
    render(){
        var product = this.props.product;
        return (
            <div className="column">
                <div className="card">
                    <div className="card-content">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                </div> 
            </div>
        )
    }
}
export default Product