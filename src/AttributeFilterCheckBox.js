import React, { Component } from "react";

/* Presents the checkbox for an attribute to toggle filtering skus */
class AttributeFilterCheckBox extends Component {
    constructor(props){
        super(props);
        this.filterByAttribute = this.filterByAttribute.bind(this);
    }

    filterByAttribute(e){
        this.props.filter(this.props.attribute.id, this._checkBox.checked);
    }
    
    render(){
        var attribute = this.props.attribute;

        return (
            <div className='checkbox'>
                <input type="checkbox" name="{attribute.name}" onChange={this.filterByAttribute}
                    ref={(el) => this._checkBox = el} />
                <label htmlFor="{attribute.name}">{attribute.name}</label>
            </div>
        );
    }    
}

export default AttributeFilterCheckBox;