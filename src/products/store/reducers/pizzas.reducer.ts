// import all actions from our pizza.action file
import * as fromPizzas from '../actions/pizzas.action';

// interfaces
import { Pizza } from '../../models/pizza.model';

// create the interface for the initial Pizza state
export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
}

// create the initial state of the Pizza as type PizzaState
export const initialState: PizzaState = {
    data: [],
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromPizzas.PizzasAction // sets type from pizza.action file (the exported type, PizzaAction )
): PizzaState {
    // switch statement based on the action type
    switch (action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            // return new state by
            // merging the initial state with the updated property
            return {
                ...state,
                loading: true
            };
        }

        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            };
        }

        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

// export some levels of state
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
