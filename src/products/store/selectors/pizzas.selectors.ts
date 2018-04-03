import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

import { Pizza } from '../../models/pizza.model';

// composes our top level getProductsState
// ****** pizza LEVEL ******
export const getPizzaState = createSelector(
    fromFeature.getProductsState,
    (state: fromFeature.ProductsState) => state.pizzas
);

// returns the state of a pizza: getPizzas, getPizzasLoaded, getPizzasLoading
export const getPizzasEntities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
);

// get an individual pizza
export const getSelectedPizza = createSelector(
    getPizzasEntities,
    fromRoot.getRouterState,
    (entities, router): Pizza => {
        return router.state && entities[router.state.params.pizzaId];
    }
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
