import {Injectable} from '@angular/core';

@Injectable()
export class SvgUrlResolverService {
  constructor() {
  }

  getUrl(id){
    return `${window.location.href}#${id}`;
  }
}
