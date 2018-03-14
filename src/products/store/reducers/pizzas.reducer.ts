// import all actions from our pizza.action file
import * as fromPizzas from '../actions/pizzas.action';

// interfaces
import { Pizza } from '../../models/pizza.model';

// create the interface for the initial Pizza state
export interface PizzaState {
    entities: { [id: number]: Pizza };
    loaded: boolean;
    loading: boolean;
}

// create the initial state of the Pizza as type PizzaState
export const initialState: PizzaState = {
    entities: {},
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
            // using entities will convert the array data structure to an object structure
            // each object having an id
            // turning this:
            // [{ id: 1 }, { id: 2 }]

            // into this
            // const pizza: any = {
            //     1: {
            //         id: 1,
            //         name: 'Pizza',
            //         topping: []
            //     }
            // }

            // this allows us to find data crazy fast!!! Like this:
            // const id = 1;
            // pizza[id];

            const pizzas = action.payload;

            // Optimizing Data Structures with Entities video ~3:40
            const entities = pizzas.reduce(
                (entities: { [id: number]: Pizza }, pizza: Pizza) => {
                    return {
                        ...entities,
                        [pizza.id]: pizza
                    };
                },
                { ...state.entities }
            );
            return {
                ...state,
                loading: false,
                loaded: true,
                entities
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
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
