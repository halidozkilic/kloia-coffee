import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { connect } from "react-redux";

class CoffeeList extends Component {

    render() {
        return (
            <div>
                {this.props.coffees.map((coffee, index) => {
                    return (
                        <div key={index}>
                            <h2>{coffee.title}</h2>
                            <p>{coffee.description}</p>
                            <span>Ingredients: {coffee.ingredients}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    if (!store || !store) { return ownProps; }

    const newProps = Object.assign({}, ownProps, {
        coffees: store.coffeeReducer.categoryCoffees
    });

    return newProps;
};

const dispatchProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchProps)(CoffeeList);