import * as actionTypes from "./actionTypes";

export const getAllCoffees = (coffee) => ({type:actionTypes.GET_ALL_COFFEES,payload:coffee})

export const changeCategory = (coffee) => ({type:actionTypes.CHANGE_CATEGORY,payload:coffee})

export const coffeeSearch = (coffee) => ({type:actionTypes.COFFEE_SEARCH,payload:coffee})


