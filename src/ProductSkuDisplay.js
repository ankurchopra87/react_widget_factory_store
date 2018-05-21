import React, { Component } from "react";

import Sku from "./Sku"

import "./product-sku-display.css"

// Presents SKU in card grid interface
class ProductSkuDisplay extends Component {
    constructor(props) {
        super(props); 
        
        this.state = { skus: [] };
        this.loadData = this.loadData.bind(this);
    }
    
    componentDidMount(){
        this.loadData(this.props);
    }

    // Load data from REST backend
    loadData(props){
        var self = this; 

        if(Number.isInteger(props.productId)){
            let url = '/api/skus/?product_id=' + props.productId; 

            // Apply search 
            if(props.search.length !==0){
                url += "&search=" + props.search;
            }

            // Apply filters
            if(props.filters.length > 0){
                url += "&attributes=" +  props.filters.join(",");
            }

            fetch(url, {
                headers: {
                    'content-type': 'application/json'
                },    
            })
            .then(result => result.json())
            .then(
                function(items){

                    // Set state
                    self.setState({
                        skus: items
                    });
                    return items;
                }
            )
        }
    }
    shouldComponentUpdate(nextProps, nextState){

        if(nextProps.search !== this.props.search ||
            nextProps.filters !== this.props.filters){
            this.loadData(nextProps);    
        }
        return true;
    }

    render(){
        var skus = this.state.skus;
        
        if(skus.length === 0){
            return null; //Or some other replacement component or markup
        }
        let renderData = [];

        for(let i=0; i < skus.length; i++){
            renderData.push(<Sku key={skus[i].id} sku={skus[i]} />);
        }

        return (
            <div className="sku-list">
                {renderData}
            </div>
        )
    }

}
export default ProductSkuDisplay