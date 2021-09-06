import React, {Component} from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import Sidebar from '../components/Sidebar';
import CoffeeList from '../components/CoffeeList';
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import * as actionCreators from "../redux/actions/actionCreators";
class CoffeePage extends Component {

    componentDidMount() {
        axios.get('http://localhost:3000/coffee/')
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
                <Container>
                    <Row className="container-fluid mt-3">
                        <Sidebar />
                        <CoffeeList />
                    </Row>
                </Container>
            </div>
        );
    }
}

const dispatchProps = (dispatch) => ({ dispatch });

export default connect(null, dispatchProps)(CoffeePage);