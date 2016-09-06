import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[latin-letters-only]'
})
export class LatinLettersOnlyDirective {
  constructor() {}

  @HostListener('keypress', ['$event']) onKeyPress($event) {
    var key = $event.keyCode || $event.which;
    key = String.fromCharCode(key);
    var regex = /[a-zA-Z]|\./;
    if (!regex.test(key)) {
      $event.preventDefault();
    }
  }
}
