import React, { Component } from "react";
import Product from "./Product"
import { NavLink } from "react-router-dom";

class Products extends Component {

    render() {
        if(this.props.products.length === 0){
            return null;
        }
        var renderData = [];

        for(let i=0; i < this.props.products.length; i++){
            let navigationTarget = "/product/" + this.props.products[i].id + "/"; 
            renderData.push(
                <NavLink key={this.props.products[i].id} to={navigationTarget}><Product product={this.props.products[i]} key={this.props.products[i].id} /></NavLink>
            );
        }

      return (
        <div className="products">
            {renderData}
        </div>
      );
    }
  }

  export default Products