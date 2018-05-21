import React, { Component } from "react";
import Products from "./Products";

/* Presents the Home page */
class Home extends Component {
    constructor() {
        super(); 
        this.state = { products: [] };
    }
    componentDidMount(){

        // Fetch products from REST API
        fetch('/api/products/', {
            headers: {
                'content-type': 'application/json'
              },    
        })
        .then(result => result.json())
        .then(items=>this.setState({
            products: items
        }))
    }

    render() {
        return (
            <div className='home main'>
                <div className='home-description'>
                    <h2>The Uber of Widgets</h2>
                    <p>
                        Widget Factory is an established company in the widget space. We sell several
                        different types of Widget, in multiple finishes and sizes. Best of all, our ordering
                        and billing systems uses the cutting-edge BitCoin technology for secure payments and 
                        rapid fulfillment. 
                    </p>
                </div>
                <div className='home-content'>
                    <Products products={this.state.products} />
                </div>
            </div>
        );
    }
}

export default Home; 