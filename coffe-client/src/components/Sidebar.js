import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/actions/actionCreators";



export default class Sidebar extends Component {
    state = {
        query:"",
        categories : [
            {id: 1, name: "All Coffees" },
            {id: 2, name: "Hot"},
            {id: 3, name: "Iced"},
        ],
        active:''
    };

    searchChange = (e) =>{
        let name = e.target;
    }

    categoryChange = (e) =>{
        let categoryId = e.target && e.target.id || '';

        if (categoryId) {
            this.setState({active: categoryId})
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Input type="text" id="searchBox" name="search" placeholder="search" onChange={this.searchChange} />
                </div>

                <div>
                    <ul id="categories" className="categories">
                        {
                            this.state.categories.map(element => (
                                <li key={element.id}
                                id={element.id}
                                name={element.name}
                                className={this.state.active === element.id ? "active" : ""}
                                onClick={() => this.categoryChange(element)}>{element.name}</li>
                            ))
                        }
                    </ul>
                </div>

            </div>
        );
    }
}