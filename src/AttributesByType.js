import React, { Component } from "react";
import AttributesCheckList from "./AttributesCheckList"

/* Presents attributes by type, used to filter skus */
class AttributesByType extends Component {
    constructor(props){
        super(props);
        this.state = { attribute_types: [] };
    }

    componentDidMount(){
        var self = this; 

        if(Number.isInteger(this.props.productId)){
            // Fetch the attribute types from REST API
            fetch('/api/product_attribute_types/', {
                headers: {
                    'content-type': 'application/json'
                },    
            })
            .then(result => result.json())
            .then(
                function(items){
                    // Set State
                    self.setState({
                        attribute_types: items
                    });
                    return items;
                }
            )
        }
    }

    render() {
        if(this.state.attribute_types.length === 0){
            return null;
        }
        var renderData = [];

        this.state.attribute_types.forEach(element => {
            renderData.push(
                <div key={element.id}>
                    <h3>{element.name}</h3>
                    <AttributesCheckList attributes={element.attribute_set} filter={this.props.filter} />
                </div>
            );    
        });
      
      return renderData;
    }
  }

  export default AttributesByType