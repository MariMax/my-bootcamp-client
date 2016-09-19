import {EventEmitter, Component, ViewEncapsulation, Input, Output} from '@angular/core';
import {SvgUrlResolverService} from '../../services'

export enum SearchComponentActions{
  search,
  open,
  close
}

@Component({
  selector: 'search-input',
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,
})
export class SearchInput {
  @Input() query: string;
  @Output() action = new EventEmitter(false);

  opened: boolean = false;
  active: boolean = false;

  constructor(private svgUrlResolver: SvgUrlResolverService) {
  }

  open() {
    this.action.emit({
      type: SearchComponentActions.open
    });
    this.opened = true;
  }

  close() {
    this.action.emit({type: SearchComponentActions.close});
    this.opened = false;
    this.active = false;
    this.action.emit({type: SearchComponentActions.search, payload: ''});
  }

  search(query: string) {
    this.opened = false;
    this.action.emit({type: SearchComponentActions.search, payload: query});
  }
}
