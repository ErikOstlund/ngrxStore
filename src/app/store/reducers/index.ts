import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
    // can extend this for our own use-cases
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer
};

// selectors: so we can ask for a particular state
export const getRouterState = createFeatureSelector<
    fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer
    implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    // go into RouterStateSnapshot source code. It extends ActivatedRouteSnapshot
    // go into that to see everything available
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        // get url from the routerState
        // same as: const url = routerState.url
        // think of these as imports!
        // We want the queryParams from the routerState.root and make it a const
        const { url } = routerState;
        const { queryParams } = routerState.root;

        // get the param if there is any (courses/545) we get the 545
        let state: ActivatedRouteSnapshot = routerState.root;
        while(state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;

        // we compose a new object based on the properties of the router
        // this url is what's actually bound to our state tree!
        return { url, queryParams, params };
    }
}
