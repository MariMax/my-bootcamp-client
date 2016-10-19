import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[numbers-only]'
})
export class NumbersOnlyDirective {
  constructor() {}

  @HostListener('keypress', ['$event']) onKeyPress($event) {
    var key = $event.keyCode || $event.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      $event.preventDefault();
    }
  }
}
