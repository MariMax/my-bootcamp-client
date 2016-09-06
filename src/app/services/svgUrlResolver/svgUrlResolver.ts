import {Injectable} from '@angular/core';
import {useHash} from '../../useHashConfig';

@Injectable()
export class SvgUrlResolverService {
  constructor() {
  }

  getUrl(id){
    return useHash?`#${id}`:`${window.location.href}#${id}`;
  }
}
