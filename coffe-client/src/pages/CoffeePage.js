import React, {Component} from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import Sidebar from '../components/Sidebar';
import CoffeeList from '../components/CoffeeList';
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { server } from "../config/config";
import * as actionCreators from "../redux/actions/actionCreators";

class CoffeePage extends Component {

    componentDidMount() {
        axios.get(server.apiUrl)
            .then(response => {
                this.props.dispatch(actionCreators.setCoffees(response.data.allCoffies));
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div class="row no-gutters">
                    <div class="col-3 col-sm-12 col-md-3" style={{padding:20}}>
                        <Sidebar />
                    </div>
                    <div class="col-9 col-sm-12 col-md-9">
                        <CoffeeList />
                    </div>
                </div>
            </div>
        );
    }
}

const dispatchProps = (dispatch) => ({ dispatch });

export default connect(null, dispatchProps)(CoffeePage);