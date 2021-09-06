import React, {Component} from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import Sidebar from '../components/Sidebar';
import CoffeeList from '../components/CoffeList';
import { Container, Row, Col } from "reactstrap";

export default class CoffeePage extends Component {

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