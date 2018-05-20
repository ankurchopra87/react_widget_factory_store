import React, { Component } from "react";
import "./address.css"

/* Presents Address section in a form */
class Address extends Component {
    render(){
        var identifier = this.props.identifier;
        return (
            <div className="col-50">
                <h3>{this.props.title}</h3>
                <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                <input type="text" id="fname" name={identifier + "_fullname"} onChange={this.props.onChange}/>
              
                <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                <input type="text" id="adr" name={identifier + "_street"} onChange={this.props.onChange}/>
                <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                <input type="text" id="city" name={identifier + "_city"} onChange={this.props.onChange}/>
      
                <div className="row">
                    <div className="col-50">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name={identifier + "_state"} onChange={this.props.onChange}/>
                    </div>
                    <div className="col-50">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" id="zip" name={identifier + "_zip"} onChange={this.props.onChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Address;