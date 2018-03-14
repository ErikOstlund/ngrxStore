// type checking for reducers
import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector
} from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

// creates an interface based off the PizzaState interface furture down the state tree
export interface ProductsState {
    pizzas: fromPizzas.PizzaState;
}

// register the reducers and say what state the reducer will manage
export const reducers: ActionReducerMap<ProductsState> = {
    // pizzas is the slice of state to be managed here
    // we are binding fromPizzas.reducer to the 'pizzas' state
    // type checking
    pizzas: fromPizzas.reducer
};

// these are selectors.
// we have to start at the top level and work our way down
// 'products' comes from the feature module (products.module)
// ****** 'product' LEVEL ******
export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
);

// composes our top level getProductsState
// ****** pizza LEVEL ******
export const getPizzaState = createSelector(
    getProductsState,
    (state: ProductsState) => state.pizzas
);

// returns the state of a pizza: getPizzas, getPizzasLoaded, getPizzasLoading
export const getPizzasEntities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
);

// returns the pizzas as an object; not an array!
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
