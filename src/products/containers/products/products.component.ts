import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store'; // selectors

// interfaces
import { Pizza } from '../../models/pizza.model';

@Component({
    selector: 'products',
    styleUrls: ['products.component.scss'],
    template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
    pizzas$: Observable<Pizza[]>;

    // type checking: means we can only gain access to state in our store of type ProductsState
    // which makes sense, because we are in the product component
    constructor(private store: Store<fromStore.ProductsState>) {}

    ngOnInit() {
        this.pizzas$ = this.store.select(fromStore.getAllPizzas);
        this.store.dispatch(new fromStore.LoadPizzas());
    }
}
