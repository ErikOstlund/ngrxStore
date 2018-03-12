// import all possible actions from our pizza.action file
import * as fromPizza from '../actions/pizzas.action';

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
    data: [
        {
            "name": "Blazin' Inferno",
            "toppings": [
              {
                "id": 10,
                "name": "pepperoni"
              },
              {
                "id": 3,
                "name": "basil"
              },
              {
                "id": 4,
                "name": "chili"
              }
            ],
            "id": 1
          }
    ],
    loaded: false,
    loading: false
};

export function reducer (
    state = initialState,
    action: fromPizza.PizzaAction  // sets type from pizza.action file (the exported type, PizzaAction )
): PizzaState {

    // switch statement based on the action type
    switch(action.type) {
        case fromPizza.LOAD_PIZZAS: {
            // return new state by
            // merging the initial state with the updated property
            return {
                ...state,
                loading: true
            };
        }

        case fromPizza.LOAD_PIZZAS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }

        case fromPizza.LOAD_PIZZAS_FAIL: {
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
