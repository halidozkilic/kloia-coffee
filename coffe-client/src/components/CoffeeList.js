import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/actions/actionCreators";


export default class CoffeeList extends Component {
    state = {
       coffees:[]
    };

    componentDidMount() {

    }

    render() {
    return (
        <div>

        </div>
    );
}
}