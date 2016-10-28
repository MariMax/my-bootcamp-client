import {Component, ViewEncapsulation, Injectable} from '@angular/core';
import {SvgUrlResolverService} from "../../services/svgUrlResolver/svgUrlResolver";

@Injectable()
export class BreadcrumbsService{

}

@Component({
  selector:'breadcrumbs',
  styleUrls:['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    style:'overflow: hidden;'
  }
})
export class Breadcrumbs{
  constructor(private svgUrlResolver:SvgUrlResolverService){}
}
