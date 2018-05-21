import React, { Component } from "react";

import ProductSkuDisplay from "./ProductSkuDisplay";
import AttributesByType from "./AttributesByType";

class ProductDetail extends Component {
    constructor(props) {
        super(props); 

        this.productId = parseInt(this.props.match.params.number, 10)
        this.fetchUrl = '/api/products/'
        this.state = {
            product: null,
            search: "" ,
            filters:[]   
        };

        this.search = this.search.bind(this);
        this.filter = this.filter.bind(this);
    }
    
    componentDidMount(){
        var self = this; 
        if(Number.isInteger(this.productId)){
            fetch(this.fetchUrl + this.productId + '/', {
                headers: {
                    'content-type': 'application/json'
                },    
            })
            .then(result => result.json())
            .then(
                function(item){
                    self.setState({
                        product: item
                    });
                    return item;
                }
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState.product !== null;
    }
    search(e){
        this.setState({
            search: this._searchInput.value
        });
    }

    filter(id, checked){
        let filters = this.state.filters.slice();
        if(checked){
            filters.push(id);
        }
        else
        {
            var index = filters.indexOf(id);
            if(index > -1){
                filters.splice(index, 1);
            }
        }
        this.setState({
            filters: filters
        });
    }
    render(){
        var product = this.state.product;

        if(product === null){
            return null;
         }

        return (
            <div className='row'>
                <div className='side'>
                    <input type="text" placeholder="Search.." onChange={this.search}
                        ref={(el) => this._searchInput = el} />
                    <AttributesByType productId={product.id} filter={this.filter} />
                    
                </div>
                <div className='main'>
                    <h1>{ product.name }</h1>
                    <div>
                    <p>{ product.description }</p>
                    </div>
                    <ProductSkuDisplay productId = { product.id } search={this.state.search} filters={this.state.filters}/>
                </div>
            </div>
        )
    }

}

export default ProductDetail