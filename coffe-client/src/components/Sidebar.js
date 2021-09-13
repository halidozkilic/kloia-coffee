import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions/actionCreators";
import axios from "axios";
import { server } from "../config/config";
import { bindActionCreators } from "redux";



class Sidebar extends Component {
    state = {
        query:"",
        categories : [
            {id: 1, name: "All Coffees" },
            {id: 2, name: "Hot"},
            {id: 3, name: "Iced"},
        ],
        active:1
    };

    searchReq = (searchText) => {
        axios.get(server.apiUrl +'/search/'+ searchText)
            .then(response => {
                this.props.dispatch(actionCreators.coffeeSearch(response.data.coffees));
            })
            .catch(error => {
                console.log(error);
            });
    }

    searchChange = (e) =>{
        let searchText = e.target && e.target.value;
        if (searchText.length >= 3){
          setTimeout(() => this.searchReq(searchText), 2000);
        }
        if (searchText.length === 0){
            this.props.dispatch(actionCreators.getAllCoffees());
        }
    }

    categoryChange = (e) => {
        if (e.target && e.target.dataset) {
            const categoryId = e.target && e.target.dataset && e.target.dataset.id;
            const categoryName = e.target && e.target.dataset && e.target.dataset.name;

            if (categoryId && categoryName) {
                this.props.dispatch(actionCreators.changeCategory(categoryName === 'All Coffees' ? '' : categoryName ));
                this.setState({active: categoryId})
            }
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
                                data-id={element.id}
                                data-name={element.name}
                                    style={this.state.active == element.id ? {color:"blue"}: {color:"black"}}
                                onClick={this.categoryChange}>{element.name}</li>
                            ))
                        }
                    </ul>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    if (!store || !store) { return ownProps; }

    const newProps = Object.assign({}, ownProps, {
        coffees: store.coffeeReducer.coffees
    });

    return newProps;
};

const dispatchProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchProps)(Sidebar);