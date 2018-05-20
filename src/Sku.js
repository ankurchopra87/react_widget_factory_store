import React, { Component } from "react";
import { connect } from "react-redux";

class Sku extends Component {
    constructor(props) {
        super(props); 
        
        this.state = { skus: [] };
        this.addSkuToCart = this.addSkuToCart.bind(this);
    }
    
    addSkuToCart(e){
        this.props.addToCart(this.props.sku);
    }

    render(){
        var sku = this.props.sku;
        
        if(sku === null){
            return null; //Or some other replacement component or markup
        }
        var attributeRenderData = []

        sku.attributes.forEach(element => {
            attributeRenderData.push(<li key={element.id}>{element.name}</li>)
        });
        
        return (
          <div className='sku'>
                 {attributeRenderData}
              <h5> {sku.currency} {sku.price}</h5>
              <button onClick={this.addSkuToCart}>Add To Cart</button>
          </div>
      )
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
      addToCart: function(item) {
        return dispatch({
          type: "addToCart",
          cartItem: item
        })  
      }
    }
  }
  
  // The HOC
  var connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sku);
  
export default connectedComponent;