import { Injectable } from '@angular/core';

// ngrx store stuff
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

// actions
import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) {}

    // marked as an effect. Listens to LOAD_PIZZAS event and returns new actions.
    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
        switchMap(() => {
            // in this switchMap we get a function and return something (a new Observable)
            // something that we can map over and return a new action
            // THIS IS THE NEW OBSERVABLE STREAM:
            return this.pizzaService.getPizzas().pipe(
                // this is the action returned to our effect
                map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
                catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
            );
        })
    );
}
