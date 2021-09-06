import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export default function coffeeReducer(state = initialState, action) {
    var newCoffees;
    switch (action.type) {
        case actionTypes.SET_COFFEES:
            newCoffees = Object.assign([], action.payload);
            return Object.assign({},
                state,
                {
                    categoryCoffees: newCoffees,
                    coffees: newCoffees
                });

        case actionTypes.CHANGE_CATEGORY:
            if (action.payload) {
                let query = action.payload;
                newCoffees = state.coffees.filter(o => o.category === query.toLowerCase());
                return Object.assign({},
                    state,
                    {
                        categoryCoffees: newCoffees
                    });
            } else {
                newCoffees = state.coffees;
                return Object.assign({},
                    state,
                    {
                        categoryCoffees: newCoffees
                    });
            }
        case actionTypes.COFFEE_SEARCH:
            newCoffees = Object.assign([], action.payload);
            return Object.assign({},
                state,
                {
                    categoryCoffees: newCoffees
                });
        case actionTypes.GET_ALL_COFFEES:
            newCoffees = state.coffees;
            return Object.assign({},
                state,
                {
                    categoryCoffees: newCoffees
                });

        default:
            return state;
    }
}
