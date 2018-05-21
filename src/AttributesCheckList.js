import React, { Component } from "react";

import AttributeFilterCheckBox from "./AttributeFilterCheckBox"

/* Presents the a list of attribute checkboxes for the type used to toggle filtering skus */
class AttributesCheckList extends Component {
    render(){
        var renderData = []
        
        if(this.props.attributes.length === 0){
            return null; 
        }

        this.props.attributes.forEach(element => { 
            renderData.push(
                <AttributeFilterCheckBox key={element.id} attribute={element} filter={this.props.filter} />
            );
        });

        return renderData;

    }
}

export default AttributesCheckList;
