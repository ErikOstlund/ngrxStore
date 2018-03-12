// type checking for reducers
import { ActionReducerMap } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

// creates an interface based off the PizzaState interface furture down the state tree
export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

// register the reducers and say what state the reducer will manage
export const reducers: ActionReducerMap<ProductsState> = {
    // pizzas is the slice of state to be managed here
    // we are binding fromPizzas.reducer to the 'pizzas' state
    // type checking
    pizzas: fromPizzas.reducer
};
