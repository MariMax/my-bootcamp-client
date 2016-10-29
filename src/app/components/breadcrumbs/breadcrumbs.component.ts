import {Component, ViewEncapsulation, Injectable} from '@angular/core';
import {SvgUrlResolverService} from "../../services/svgUrlResolver/svgUrlResolver";
import {StoreService} from "../../services/storeService/storeService";
import {ComponentBase} from '../componentBase';

const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
const REMOVE_BREADCRUMB = 'REMOVE_BREADCRUMB';

const removeItem = (items, itemRouteId) => items.filter(i=>i.itemRouteId !== itemRouteId);
const addItem = (items, newItem) => [...removeItem(items, newItem.itemRouteId), newItem];

const breadcrumbsReducer = (state=[], action) =>{
  switch (action.type){
    case ADD_BREADCRUMB:
      return addItem(state, action.payload);

    case REMOVE_BREADCRUMB:
      return removeItem(state, action.payload);

    default:
      return state;
  }
};

@Injectable()
export class BreadcrumbsService {
  storageField:string = 'breadcrumbs';

  constructor(private storageService: StoreService){}

  addItem(itemText, itemRouteId, navigateFunc) {
    this.storageService.dispatch({type:ADD_BREADCRUMB, payload:{itemText, itemRouteId, navigateFunc}});
  }

  removeItem(itemRouteId) {
    this.storageService.dispatch({type:REMOVE_BREADCRUMB, payload: itemRouteId})
  }
}

@Component({
  selector: 'breadcrumbs',
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    style: 'overflow: hidden;'
  }
})
export class Breadcrumbs extends ComponentBase{
  items:any[] = [];

  constructor(private svgUrlResolver: SvgUrlResolverService,
              private storageService: StoreService,
              private breadcrumbService: BreadcrumbsService) {
    super();
  }

  ngOnInit(){
    this.storageService.addReducer(this.breadcrumbService.storageField, breadcrumbsReducer);
    this._subscription(this.storageService.select(this.breadcrumbService.storageField)
      .subscribe(items=>this.items = items))
  }

  onDestroy(){}

  transit(item) {
    item.navigateFunc();
  }
}
